import { Injectable } from '@nestjs/common';

import { BcryptService } from '../shared/services/bcrypt.service';
import { PrismaService } from '../shared/services/prisma.service';

import { Prisma, User } from '.prisma/client';

import { UserWithoutPassword } from './types/user';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private bcryptService: BcryptService,
  ) {}

  async create(data: Prisma.UserCreateInput): Promise<UserWithoutPassword> {
    const hashedPassword = await this.bcryptService.hash(data.password);
    return this.prisma.user.create({
      data: { ...data, password: hashedPassword },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        city_id: false,
        phone: true,
        district: true,
        number: true,
        street: true,
        type: true,
        city: {
          include: {
            state: true,
          },
        },
      },
    });
  }

  async findOne(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
      include: { city: { include: { state: true } } },
    });
  }
}
