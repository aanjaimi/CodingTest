import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
