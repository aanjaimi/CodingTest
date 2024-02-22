import { Injectable, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AUTH_COOKIE_MAX_AGE, AUTH_COOKIE_NAME } from './auth.constants';
import { JwtAuthPayload } from './interfaces/jwt.interface';
import { RedisService } from '../redis/redis.service';
import { WsGateway } from '../ws/ws.gateway';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private redisService: RedisService,
    private wsGateway: WsGateway,
    private prismaService: PrismaService,
    private emailService: EmailService,
  ) {}

  async getUserById(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async getUserByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async checkExisting(@Req() req: Request) {
    const { email, username } = req.query as {
      email: string;
      username: string;
    };
    try {
      const user = await this.getUserByEmail(email);

      if (user) return { error: 'Email already exists!' };

      const user2 = await this.prismaService.user.findUnique({
        where: { username },
      });

      if (user2) return { error: 'Username already exists!' };
    } catch (e) {
      return { success: 'Email and username are available!' };
    }
  }

  async reset(@Req() req: Request) {
    const { email } = req.body as {
      email: string;
    };

    const user = await this.getUserByEmail(email);
    if (!user) return { error: 'Email not found!' };

    const token = uuidv4();
    await this.redisService.set(
      `reset-password-${token}`,
      user.email,
      'EX',
      600,
    );
    try {
      const link =
        this.configService.get('FRONTEND_ORIGIN') +
        '/reset-password?email=' +
        user.email +
        '&token=' +
        token;
      await this.emailService.sendMail({
        from: 'ayoub.anjaimi99@gmail.com',
        to: email,
        subject: 'Reset your password',
        html: `<p>Click <a href=${link}>here</a> to reset your password`,
      });
    } catch (e) {
      return { error: 'Email not sent!' };
    }
    return { success: 'Email sent!', token: token };
  }

  async resetPassword(@Req() req: Request) {
    const { email, token, password } = req.body as {
      email: string;
      token: string;
      password: string;
    };

    const userEmail = await this.redisService.get(`reset-password-${token}`);
    if (!userEmail || userEmail != email) return { error: 'Invalid token!' };

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.prismaService.user.update({
      where: { email: userEmail },
      data: {
        password: hashedPassword,
      },
    });
    return { success: 'Password changed successfully!' };
  }

  async register(@Req() req: Request, @Res() res: Response) {
    const { email, username, firstName, lastName, password } = req.body as {
      email: string;
      username: string;
      firstName: string;
      lastName: string;
      password: string;
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.prismaService.user.create({
        data: {
          email,
          username,
          firstName,
          lastName,
          password: hashedPassword,
          avatar: {
            minio: true,
            path: 'default-avatar.png',
          },
          bio: '',
          location: '',
          birthday: null,
        },
      });

      res.send({
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        location: user.location,
        birthday: user.birthday,
      });
    } catch (e) {
      console.log(e);
      res.send(null);
    }
  }

  async login(@Req() req: Request, @Res() res: Response) {
    const { email, password } = req.query as {
      email: string;
      password: string;
    };

    try {
      let userWithUsername = await this.prismaService.user.findUnique({
        where: { username: email },
      });

      if (!userWithUsername) {
        const userWithEmail = await this.getUserByEmail(email);

        if (!userWithEmail) {
          res.send({ error: 'Invalid Email or Username' });
          return;
        }
        userWithUsername = userWithEmail;
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        userWithUsername.password,
      );

      if (!isPasswordValid) {
        res.send({ error: 'Invalid Password' });
        return;
      }

      const payload = {
        iss: 'CodingTest',
        email: userWithUsername.email,
        sub: userWithUsername.email,
      } satisfies JwtAuthPayload;

      const accessToken = await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: AUTH_COOKIE_MAX_AGE,
      });

      res.cookie(AUTH_COOKIE_NAME, accessToken, {
        httpOnly: true,
        path: '/',
        maxAge: AUTH_COOKIE_MAX_AGE * 1e3,
      });

      res.send({ success: 'You are logged in' });
    } catch (e) {
      res.send({ error: 'Cannot logged in' });
    }
  }

  async logout(req: Request, res: Response) {
    const accessToken = req.body.token;

    // await this.redisService.hset(
    //   `token-${accessToken}`,
    //   'explicit-expiration',
    //   1,
    // );

    const currentUser = await this.jwtService.verifyAsync(accessToken, {
      secret: this.configService.get('JWT_SECRET'),
    });

    if (currentUser.email == req.user.email) {
      console.log('logging out1');
      res.clearCookie(AUTH_COOKIE_NAME, {
        httpOnly: true,
        expires: new Date(0),
        path: '/',
      });
      console.log('logging out2');
      res.redirect(this.configService.get('FRONTEND_ORIGIN'));
      console.log('logging out3');
    }

    // const allSocketIds = Object.keys(
    //   await this.redisService.hgetall(currentUser.id),
    // );
    // this.closeConnections(allSocketIds);
    // if (allSocketIds.length) {
    //   await this.redisService.hdel(currentUser.id, ...allSocketIds); // delete all socket session ids
    // }
  }

  private closeConnections(socketIds: string[]) {
    this.wsGateway.io()._nsps.forEach((nsp) => {
      socketIds.forEach((socketId) => {
        const clientSocket = nsp.sockets.get(socketId);
        if (clientSocket) {
          clientSocket.disconnect(true);
        }
      });
    });
  }

  // TODO: remove later
  async getToken(email: string) {
    const payload = {
      iss: 'CodingTest',
      email: email,
      sub: email,
    } satisfies JwtAuthPayload;

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: Math.ceil(AUTH_COOKIE_MAX_AGE),
    });
    return { accessToken };
  }
}
