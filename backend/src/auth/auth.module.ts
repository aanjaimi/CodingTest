import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    PassportModule.register({
      session: false,
    }),
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
})
export class AuthModule {}
