import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(id: string): Promise<User> {
    const user = await this.usersService.findOne(id);

    if (user) {
      return user;
    }

    const newUser = new CreateUserDto();
    newUser.id = id;
    newUser.token = this.jwtService.sign({ sub: id });

    this.usersService.create(newUser);

    return newUser;
  }

  async login(user: User) {
    return user;
  }

  async refreshLogin(user: User) {
    user.token = this.jwtService.sign({ sub: user.id });

    return this.usersService.update(user);
  }
}
