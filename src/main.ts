import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  // de acordo com doc do prisma e do nest, agora é necessário para os escutadores de eventos de encerramento funcionarem
  app.enableShutdownHooks();
  await app.listen(3000);
}

bootstrap();
