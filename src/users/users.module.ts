import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserHandler } from './create-user.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  providers: [UsersService, CreateUserHandler],
  exports: [UsersService],
})
export class UsersModule {}
