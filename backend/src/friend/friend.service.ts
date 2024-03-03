import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FriendState } from '@prisma/client';

@Injectable()
export class FriendService {
  constructor(private prismaService: PrismaService) {}

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

  async isFollowing(myId: string, id: string) {
    const following = await this.prismaService.friend.findMany({
      where: { friendId: id, userId: myId },
    });
    return following;
  }

  async isFollower(myId: string, id: string) {
    const followers = await this.prismaService.friend.findMany({
      where: { userId: id, friendId: myId },
    });
    return followers;
  }

  async follow(myId: string, id: string) {
    await this.prismaService.friend.create({
      data: {
        userId: myId,
        friendId: id,
        state: FriendState.ACCEPTED,
      },
    });
    return true;
  }

  async unfollow(myId: string, id: string) {
    await this.prismaService.friend.deleteMany({
      where: {
        userId: myId,
        friendId: id,
      },
    });
    return true;
  }
}
