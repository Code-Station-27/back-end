import { Module } from '@nestjs/common';
// import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
// import * as redisStore from 'cache-manager-redis-store';

import { AuthModule } from './auth/auth.module';
import { CitiesModule } from './cities/cities.module';
import { HealthModule } from './health/health.module';
import { StatesModule } from './states/states.module';
import { TokensModule } from './tokens/tokens.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    StatesModule,
    CitiesModule,
    HealthModule,
    TokensModule,
    // CacheModule.register({
    //   store: redisStore,
    //   host: process.env.REDIS_HOST,
    //   port: process.env.REDIS_PORT,
    // }),
  ],
  // providers: [
  //   {
  //     provide: APP_INTERCEPTOR,
  //     useClass: CacheInterceptor,
  //   },
  // ],
})
export class AppModule {}
