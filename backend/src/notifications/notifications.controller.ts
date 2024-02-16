import { Controller, Get, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('/notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Get(':id')
  async findAll(@Param('id') id: string) {
    return await this.notificationsService.getNotifications(id);
  }
}
