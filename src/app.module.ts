import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { CitiesModule } from './cities/cities.module';
import { HealthModule } from './health/health.module';
import { PersonalModule } from './personal/personal.module';
import { StatesModule } from './states/states.module';
import { TokensModule } from './tokens/tokens.module';
import { TrainingsModule } from './trainings/trainings.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    StatesModule,
    CitiesModule,
    HealthModule,
    TokensModule,
    TrainingsModule,
    PersonalModule,
    CacheModule.register(),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
