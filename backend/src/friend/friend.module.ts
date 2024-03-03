import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports: [],
  controllers: [FriendController],
  providers: [FriendService, JwtStrategy],
})
export class FriendModule {}
