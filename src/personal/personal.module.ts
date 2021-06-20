import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';

import { PersonalController } from './personal.controller';
import { PersonalService } from './personal.service';

@Module({
  providers: [PersonalService, PrismaService],
  controllers: [PersonalController],
})
export class PersonalModule {}
