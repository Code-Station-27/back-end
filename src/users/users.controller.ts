import { Controller, Post, Body } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';

import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDto): Promise<UserModel> {
    return this.usersService.create(data);
  }
}
