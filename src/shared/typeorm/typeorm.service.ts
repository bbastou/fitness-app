import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Category } from '../../fitness/category.entity';
import { User } from '../../users/user.entity';
import { Exercise } from '../../fitness/exercise.entity';
import { Program } from '../../fitness/program.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: this.config.get<string>('DATABASE_PORT') as unknown as number,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [User, Category, Exercise, Program],
      migrations: ['dist/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      logger: 'file',
      synchronize: true, // never use TRUE in production!
    };
  }
}
