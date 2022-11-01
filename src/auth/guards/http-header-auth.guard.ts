import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class HttpHeaderAuthGuard extends AuthGuard(
  'passport-http-header-strategy',
) {}
