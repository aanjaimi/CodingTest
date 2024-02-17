import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserQueryDTO } from './users.dto';
import { Prisma, User } from '@prisma/client';
import { UserUpdateDTO } from './users.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUsers(userId: string, query: UserQueryDTO) {
    const where = {
      AND: [
        {
          ...(query.email && {
            email: { contains: query.email, mode: 'insensitive' },
          }),
        },
      ],
    } satisfies Prisma.UserWhereInput;

    const users = await this.prismaService.user.findMany({
      where,
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        status: true,
        avatar: true,
      },
    });
    return users;
  }

  async getUser(currUser: User, username: string) {
    if (['@me', currUser.username, currUser.email].includes(username)) {
      username = currUser.username;
    }
    const user = await this.prismaService.user.findFirst({
      where: {
        username: username,
      },
      include: {
        Question: true,
        Answer: true,
      },
    });

    return user;
  }

  async updateUser(
    user: User,
    avatar: Express.Multer.File,
    body: UserUpdateDTO,
  ) {
    // const path = avatar?.path;
    // const { tfa, ...rest } = body;
    // if (tfa === true && user.totp['enabled']) throw new ConflictException();
    // let totp = { enabled: tfa === true };
    // if (tfa) {
    //   const payload = speakeasy.generateSecret({
    //     name: 'Transcendence',
    //     issuer: user.email,
    //   });
    //   totp = Object.assign(totp, payload);
    // }
    // if (rest.email) {
    //   const existantUser = await this.prismaService.user.findUnique({
    //     where: { email: rest.email },
    //   });
    //   if (existantUser && existantUser.id !== user.id) {
    //     throw new HttpException('Displayname already taken', 403);
    //   }
    // }
    // return await this.prismaService.user.update({
    //   where: { id: user.id },
    //   select: {
    //     email: true,
    //     id: true,
    //     avatar: true,
    //     status: true,
    //     // totp: true,
    //   },
    //   data: {
    //     ...rest,
    //     ...(path && {
    //       avatar: {
    //         path,
    //         minio: true,
    //       },
    //     }),
    //   },
    // });
  }
}
