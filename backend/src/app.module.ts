import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationSchema, validationOptions } from './config/validation.joi';
import { AuthModule } from './auth/auth.module';
import { WsModule } from './ws/ws.module';
import { RedisModule } from './redis/redis.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      validationOptions,
    }),
    PrismaModule,
    AuthModule,
    WsModule,
    EmailModule,
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          host: configService.getOrThrow('REDIS_HOST'),
          port: configService.getOrThrow('REDIS_PORT'),
          password: configService.getOrThrow('REDIS_PASSWORD'),
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
