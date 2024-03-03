import {
  Controller,
  Get,
  UseGuards,
  Param,
  Body,
  Post,
  Delete,
} from '@nestjs/common';
import { FriendService } from './friend.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { FollowQueryDTO } from './friend.dto';

@Controller('/friend')
@UseGuards(JwtAuthGuard)
export class FriendController {
  constructor(private friendService: FriendService) {}

  @Get('followers/:id')
  async getFollowers(@Param('id') id: string) {
    return await this.friendService.getFollowers(id);
  }

  @Get('following/:id')
  async getFollowing(@Param('id') id: string) {
    return await this.friendService.getFollowing(id);
  }

  @Get('follow')
  async isFollowing(@Body() body: FollowQueryDTO) {
    return await this.friendService.isFollowing(body.myId, body.id);
  }

  @Get('follower')
  async isFollower(@Body() body: FollowQueryDTO) {
    return await this.friendService.isFollower(body.myId, body.id);
  }

  @Post('follow')
  async follow(@Body() body: FollowQueryDTO) {
    return await this.friendService.follow(body.myId, body.id);
  }

  @Delete('unfollow')
  async unfollow(@Body() body: FollowQueryDTO) {
    return await this.friendService.unfollow(body.myId, body.id);
  }
}
