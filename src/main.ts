import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('PerFit API Doc')
    .setDescription('A API doc from PerFit Platform')
    .setVersion('1.0')
    .addTag('health')
    .addTag('users')
    .addTag('auth')
    .addTag('states')
    .addTag('cities')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
