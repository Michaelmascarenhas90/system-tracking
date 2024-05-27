import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  dotenv.config();
  app.enableCors({
    origin: [
      'http://localhost',
      'http://localhost:5173',
      'http://seu-endereco-ec2.com.br',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: '*',
  });

  app.useGlobalPipes(new ValidationPipe());
  // de acordo com doc do prisma e do nest, agora é necessário para os escutadores de eventos de encerramento funcionarem
  app.enableShutdownHooks();

  const config = new DocumentBuilder()
    .setTitle('Nome da sua API')
    .setDescription('Descrição da sua API')
    .setVersion('1.0')
    .addTag('tag1') // Adicione tags para organizar seus endpoints
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
