import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationSchema, validationOptions } from './config/validation.joi';
import { AuthModule } from './auth/auth.module';
import { WsModule } from './ws/ws.module';
import { RedisModule } from './redis/redis.module';
import { EmailModule } from './email/email.module';
import { UserModule } from './users/users.module';
// import { MinioModule } from './minio/minio.module';

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
    UserModule,
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
    // MinioModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory(configService: ConfigService) {
    //     return {
    //       endPoint: configService.get('MINIO_ENDPOINT'),
    //       port: 9000,
    //       useSSL: false,
    //       accessKey: configService.get('MINIO_ACCESS_KEY'),
    //       secretKey: configService.get('MINIO_SECRET_KEY'),
    //     };
    //   },
    // }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
