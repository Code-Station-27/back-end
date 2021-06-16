import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';

import { User } from '.prisma/client';

import { Public } from '../shared/decorators/public.decorator';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IAccessTokenResponse, ITokenResponse } from './types/auth';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: User }): Promise<IAccessTokenResponse> {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('refresh-token')
  async refreshToken(@Body() data: RefreshTokenDto): Promise<ITokenResponse> {
    return this.authService.refreshToken(data.token, data.refresh_token);
  }
}
