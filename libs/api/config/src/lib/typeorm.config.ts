import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config({ path: 'envs/.env.backend.local' });

const configService = new ConfigService();

const baseConfig: DataSourceOptions = {
  type: 'postgres',
  host: configService.getOrThrow('POSTGRES_HOST'),
  port: configService.getOrThrow('POSTGRES_PORT'),
  username: configService.getOrThrow('POSTGRES_USER'),
  password: configService.getOrThrow('POSTGRES_PASSWORD'),
  database: configService.getOrThrow('POSTGRES_DB')
  // entities: ['libs/**/*.entity.ts'],
  // migrations: ['migrations/**']
};

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async () => ({
    ...baseConfig,
    autoLoadEntities: true,
    synchronize: process.env['NODE_ENV'] === 'development',
    migrationsRun: true
  })
};

export const AppDataSource = new DataSource(baseConfig);
