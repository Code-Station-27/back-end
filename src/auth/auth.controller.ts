import { Controller, Request, Post, UseGuards } from '@nestjs/common';

import { User } from '.prisma/client';

import { Public } from '../shared/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: User }): Promise<{
    access_token: string;
  }> {
    return this.authService.login(req.user);
  }
}
