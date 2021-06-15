import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { CitiesModule } from './cities/cities.module';
import { StatesModule } from './states/states.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, AuthModule, StatesModule, CitiesModule],
})
export class AppModule {}
