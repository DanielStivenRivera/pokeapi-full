import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Init1726688978008 } from '../../migrations/1726688978008-init';
import { User } from '../../users/entities/user.entity';

config();

export const getConnectionSource = (configService: ConfigService) => {
  return new DataSource({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    database: configService.get<string>('DB_NAME'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    synchronize: false,
    entities: [User],
    migrations: [Init1726688978008],
    migrationsTableName: 'migrations',
  });
};

export const executeMigrations = async (configService: ConfigService) => {
  const connectionSource = getConnectionSource(configService);
  try {
    await connectionSource.initialize();
    const pendingMigrations = await connectionSource.showMigrations();
    if (pendingMigrations) {
      await connectionSource.runMigrations();
    }
  } catch (e) {
    console.error(e);
  } finally {
    await connectionSource.destroy();
  }
};
