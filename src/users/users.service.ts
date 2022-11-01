import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommandBus } from '@nestjs/cqrs';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { CreateUserCommand } from './create-user.command';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private commandBus: CommandBus,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.commandBus.execute(
      new CreateUserCommand(createUserDto.id, createUserDto.token),
    );
  }

  async update(user: User): Promise<User> {
    // No benchmark test on this - but should also use CQRS
    await this.usersRepository.update({ id: user.id }, user);

    return user;
  }

  async findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }
}
