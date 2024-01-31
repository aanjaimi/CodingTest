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
        email: true,
        status: true,
      },
    });
    return users;
  }

  async getUser(currUser: User, otherId: string) {
    if (['@me', currUser.id, currUser.email].includes(otherId)) {
      otherId = currUser.id;
    }
    const user = await this.prismaService.user.findFirst({
      where: {
        id: otherId,
      },
      include: {
        Question: true,
        Answer: true,
      },
    });

    return user;
  }
}
