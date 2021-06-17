import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/shared/services/bcrypt.service';
import { TokensService } from 'src/tokens/tokens.service';
import { UsersService } from 'src/users/users.service';

import { User } from '.prisma/client';

import { ILoginResponse, ITokenResponse } from './types/auth';

type IUserPayload = {
  sub: string;
  name: string;
  email: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private bcryptService: BcryptService,
    private jwtService: JwtService,
    private tokenService: TokensService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findOne(email);
    const isMatch = await this.bcryptService.compare(password, user.password);
    if (user && isMatch) {
      const { password: _password, ...data } = user;
      return data;
    }
    return null;
  }

  async login(user: User): Promise<ILoginResponse> {
    const refresh_token = await this.bcryptService.hash(user.email);
    const access_token = this.jwtService.sign({
      sub: user.id,
      name: user.name,
      email: user.email,
    });
    await this.tokenService.upsert({
      refresh_token,
      token: access_token,
      user: { connect: { id: user.id } },
    });
    return {
      user,
      access_token,
      refresh_token,
    };
  }

  async refreshToken(
    token: string,
    refreshToken: string,
  ): Promise<ITokenResponse> {
    const { email } = this.jwtService.decode(token) as IUserPayload;
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const { token: oldToken, refresh_token } = await this.tokenService.findOne({
      where: { user_id: user.id },
    });
    if (oldToken !== token || refresh_token !== refreshToken) {
      throw new UnauthorizedException();
    }
    const newRefreshToken = await this.bcryptService.hash(user.email);
    const newToken = this.jwtService.sign({
      sub: user.id,
      name: user.name,
      email: user.email,
    });
    await this.tokenService.upsert({
      refresh_token: newRefreshToken,
      token: newToken,
      user: { connect: { id: user.id } },
    });
    return {
      access_token: newToken,
      refresh_token: newRefreshToken,
    };
  }
}
