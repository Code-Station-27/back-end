import { Module } from '@nestjs/common';

import { BcryptService } from '../shared/services/bcrypt.service';
import { PrismaService } from '../shared/services/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, BcryptService],
})
export class UsersModule {}
