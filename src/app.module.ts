import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { StatesModule } from './states/states.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, AuthModule, StatesModule],
})
export class AppModule {}
