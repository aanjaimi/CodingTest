import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { SocketIoAdapter } from './ws/socket-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const corsOptions = {
    credentials: true,
    origin: configService.getOrThrow('FRONTEND_ORIGIN'),
    optionsSuccessStatus: 200,
  } as CorsOptions;
  app.enableCors(Object.assign(corsOptions)); // nestjs updating the origin property
  app.useWebSocketAdapter(new SocketIoAdapter(app, corsOptions));

  await app.listen(configService.getOrThrow('PORT'));
}
bootstrap();
