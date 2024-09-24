import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { executeMigrations } from './shared/utils/datasource';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  await executeMigrations(configService);

  const config = new DocumentBuilder()
    .setTitle('POKEAPI USERS ADMIN')
    .setDescription(
      'Backend with auth and user register for save data got from poke api',
    )
    .setVersion('1.0')
    .addTag('POKEAPI USERS ADMIN')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get('PORT'));
  console.log(
    `app listening on port: http://localhost:${configService.get<number>('PORT')}`,
  );
}

bootstrap();
