import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-header-strategy';
import { AuthService } from '../auth.service';
import { User } from '../../users/user.entity';

@Injectable()
export class HttpHeaderStrategy extends PassportStrategy(
  Strategy,
  'passport-http-header-strategy',
) {
  constructor(private readonly authService: AuthService) {
    super({
      header: 'identifier-for-vendor',
    });
  }

  async validate(id: string): Promise<User> {
    const user = await this.authService.validateUser(id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
