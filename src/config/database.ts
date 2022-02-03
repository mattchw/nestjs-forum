import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || '127.0.0.1',
  port: parseInt(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'test1234',
  database: process.env.POSTGRES_DATABASE || 'nestjs-forum',
  autoLoadEntities: true,
  synchronize: true,
} as TypeOrmModuleOptions;
