import { Injectable } from '@nestjs/common';

import { AuthService } from './auth/auth.service';
import { FitnessService } from './fitness/fitness.service';
import { User } from './users/user.entity';

@Injectable()
export class AppService {
  constructor(
    private readonly authService: AuthService,
    private readonly fitnessService: FitnessService,
  ) {}

  async login(user: User) {
    const [authenticatedUser, categories] = await Promise.all([
      this.authService.login(user),
      this.fitnessService.findAll(),
    ]);

    return {
      user: authenticatedUser,
      data: {
        categories,
      },
    };
  }

  getProfile(user: User) {
    // TODO : validation id par rapport au token
    return this.authService.refreshLogin(user);
  }
}
