import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { executeMigrations } from './shared/utils/datasource';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  await executeMigrations(configService);

  await app.listen(configService.get('PORT'));
  console.log(
    `app listening on port: http://localhost:${configService.get<number>('PORT')}`,
  );
}

bootstrap();
