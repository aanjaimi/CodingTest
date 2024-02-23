import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserQueryDTO } from './users.dto';
import { Prisma, User } from '@prisma/client';

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
        bio: true,
        location: true,
        birthday: true,
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
        questions: true,
        questionLikes: true,
        answers: true,
        favorites: true,
      },
    });

    return user;
  }

  async updateUser(user: User, body: any) {
    console.log('update user');
    return await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        ...body,
      },
    });

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

  async getFollowers(id: string) {
    const followers = await this.prismaService.friend.findMany({
      where: { userId: id },
    });
    return followers;
  }

  async getFollowing(id: string) {
    const following = await this.prismaService.friend.findMany({
      where: { friendId: id },
    });
    return following;
  }
}
