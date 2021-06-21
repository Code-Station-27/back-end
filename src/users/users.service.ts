import { Injectable } from '@nestjs/common';
import { userSelect } from 'src/shared/utils/user.select';

import { BcryptService } from '../shared/services/bcrypt.service';
import { PrismaService } from '../shared/services/prisma.service';

import { Prisma, User, UserType } from '.prisma/client';

import { UserWithoutPassword } from './types/user';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private bcryptService: BcryptService,
  ) {}

  async create(data: Prisma.UserCreateInput): Promise<UserWithoutPassword> {
    const hashedPassword = await this.bcryptService.hash(data.password);
    let user: Prisma.UserCreateInput;
    console.log('data', data);
    if (data.type === UserType.PERSONAL) {
      user = {
        ...data,
        password: hashedPassword,
        personal: {
          create: {
            price: data.personal.create.price,
          },
        },
      };
    } else {
      user = { ...data, password: hashedPassword };
    }
    return this.prisma.user.create({
      data: user,
      select: { ...userSelect },
    });
  }

  async findOne(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
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
        personal: true,
      },
    });
  }
}
