import { Injectable } from '@nestjs/common';
import { BcryptService } from 'src/shared/services/bcrypt.service';

import { PrismaService } from '../shared/services/prisma.service';

import { Prisma, User } from '.prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private bcryptService: BcryptService,
  ) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await this.bcryptService.hash(data.password);
    return this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
  }
}
