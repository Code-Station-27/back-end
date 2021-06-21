import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { User } from '.prisma/client';

import { Public } from '../shared/decorators/public.decorator';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IAccessTokenResponse, ITokenResponse } from './types/auth';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiParam({
    name: 'email',
    required: true,
    schema: { oneOf: [{ type: 'string' }] },
  })
  @ApiParam({
    name: 'password',
    required: true,
    schema: { oneOf: [{ type: 'string' }] },
  })
  @ApiResponse({ status: 201, description: 'Login successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async login(@Request() req: { user: User }): Promise<IAccessTokenResponse> {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('refresh-token')
  @ApiParam({
    name: 'token',
    required: true,
    schema: { oneOf: [{ type: 'string' }] },
  })
  @ApiParam({
    name: 'refresh_token',
    required: true,
    schema: { oneOf: [{ type: 'string' }] },
  })
  async refreshToken(@Body() data: RefreshTokenDto): Promise<ITokenResponse> {
    return this.authService.refreshToken(data.token, data.refresh_token);
  }
}
