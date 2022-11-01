import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Put,
  Request,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { HttpHeaderAuthGuard } from './auth/guards/http-header-auth.guard';

import { User } from './users/user.entity';
import { Category } from './fitness/category.entity';

class DataDto {
  @ApiProperty({
    isArray: true,
  })
  categories: Category;
}

class DataResponse {
  @ApiProperty()
  user: User;

  @ApiProperty({
    description: 'List of data',
    type: [DataDto],
  })
  data: DataDto[];
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(HttpHeaderAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiTags('data')
  @ApiHeader({ name: 'identifier-for-vendor', required: true })
  @ApiResponse({
    status: 200,
    type: DataResponse,
    description:
      'Get list of fitness data, save IDFV and authenticate the user',
  })
  @Get('data')
  async login(@Request() req: any) {
    return this.appService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: User,
    description: 'User token successfuly renewed',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiTags('users')
  @Put('users/:id')
  getProfile(@Request() req: any) {
    // TODO: :id validator compared to user
    return this.appService.getProfile(req.user);
  }
}
