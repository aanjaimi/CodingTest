import { RedisService } from '../../redis/redis.service';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private redisService: RedisService) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const req: Request = context.switchToHttp().getRequest();

    const accessToken = req.headers.cookie as string | null;

    const explicitExpiration = await this.redisService.hget(
      `token-${accessToken}`,
      'explicit-expiration',
    );

    if (explicitExpiration == '1') throw new UnauthorizedException();

    return true;
  }

  handleRequest(err: unknown, user: unknown): any {
    if (err || !user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
