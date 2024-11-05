import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());

  // Validation
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: false }));

  // OpenAPI Specification
  const config = new DocumentBuilder()
    .setTitle('API for the users fathers and sons')
    .setDescription(
      'A REST API using Nestjs to create CRUD operations on sons table',
    )
    .setVersion('1.0')
    .addTag('sons')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.API_PORT || 5000);

}
bootstrap();
