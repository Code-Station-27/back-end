import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';

import { TrainingsController } from './trainings.controller';
import { TrainingsService } from './trainings.service';

@Module({
  controllers: [TrainingsController],
  providers: [TrainingsService, PrismaService],
})
export class TrainingsModule {}
