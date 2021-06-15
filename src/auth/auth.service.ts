import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/shared/services/bcrypt.service';
import { UsersService } from 'src/users/users.service';

import { User } from '.prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private bcryptService: BcryptService,
    private jwtService: JwtService,
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

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { sub: user.email, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
