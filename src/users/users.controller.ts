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
  async create(@Body() data: CreateUserDto): Promise<UserWithoutPassword> {
    return this.usersService.create({
      ...data,
      city: { connect: { id: data.city } },
    });
  }
}
