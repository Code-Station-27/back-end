import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';

import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';

@Module({
  controllers: [CitiesController],
  providers: [CitiesService, PrismaService],
})
export class CitiesModule {}
