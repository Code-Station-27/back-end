import { Controller, Post, Body } from '@nestjs/common';

import { Public } from '../shared/decorators/public.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserWithoutPassword } from './types/user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() body: CreateUserDto): Promise<UserWithoutPassword> {
    const { price, ...data } = body;
    if (body.type === 'PERSONAL') {
      return this.usersService.create({
        ...data,
        city: { connect: { id: data.city } },
        personal: { create: { price, rating: null } },
      });
    }
    return this.usersService.create({
      ...data,
      city: { connect: { id: data.city } },
    });
  }
}
