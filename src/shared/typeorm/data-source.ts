import { DataSource } from 'typeorm';

// FIXME: do not duplicate conf only for fixture purpose...
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: process.env.DATABASE_PORT as unknown as number,
  username: 'root',
  password: 'root',
  database: 'test',
  entities: ['dist/**/*.entity.{ts,js}'],
  migrations: ['dist/migrations/*.{ts,js}'],
  migrationsTableName: 'typeorm_migrations',
  logger: 'file',
});
