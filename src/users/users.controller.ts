import { Controller, Post, Body } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { Public } from '../shared/decorators/public.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserWithoutPassword } from './types/user';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @ApiParam({
    name: 'email',
    required: true,
    schema: { oneOf: [{ type: 'string' }] },
  })
  @ApiParam({
    name: 'password',
    required: true,
    schema: { oneOf: [{ type: 'string' }] },
  })
  @ApiParam({
    name: 'phone',
    required: true,
    schema: { oneOf: [{ type: 'string' }] },
  })
  @ApiParam({
    name: 'city',
    required: true,
    schema: { oneOf: [{ type: 'string' }] },
  })
  @ApiParam({
    name: 'street',
    required: true,
    schema: { oneOf: [{ type: 'string' }] },
  })
  @ApiParam({
    name: 'number',
    required: true,
    schema: { oneOf: [{ type: 'string' }] },
  })
  @ApiParam({
    name: 'district',
    required: true,
    schema: { oneOf: [{ type: 'string' }] },
  })
  @ApiParam({
    name: 'type',
    required: true,
    schema: { oneOf: [{ type: 'string' }] },
  })
  async create(@Body() data: CreateUserDto): Promise<UserWithoutPassword> {
    return this.usersService.create({
      ...data,
      city: { connect: { id: data.city } },
    });
  }
}
