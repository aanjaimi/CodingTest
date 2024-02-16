import { Injectable } from '@nestjs/common';
import { NotifType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prismaService: PrismaService) {}

  async getNotifications(id: string) {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        AND: {
          receiverId: id,
          OR: [
            { type: NotifType.FRIEND_ACCEPT },
            { type: NotifType.FRIEND_REQUEST },
          ],
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        sender: {
          select: {
            firstName: true,
            lastName: true,
            username: true,
            avatar: true,
          },
        },
        receiver: {
          select: {
            firstName: true,
            lastName: true,
            username: true,
            avatar: true,
          },
        },
      },
    });
    return notifications;
  }
}
