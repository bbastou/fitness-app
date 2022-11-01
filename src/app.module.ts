import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';

import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FitnessModule } from './fitness/fitness.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        readyLog: true,
        config: {
          port: configService.get<string>('CACHE_PORT') as unknown as number,
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    FitnessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
