import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get(ConfigService);
  const serverPort = configService.get('SERVER_PORT');
  await app.listen({ port: serverPort }, (error) => {
    if (error) {
      logger.error(error);
      process.exit(1);
    }
  });
  logger.log(`Server running on port ${serverPort}`);
}

bootstrap();
