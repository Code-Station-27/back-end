import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class PrismaHealthIndicator extends HealthIndicator {
  constructor(private prisma: PrismaService) {
    super();
  }

  async isHealthy(): Promise<HealthIndicatorResult> {
    const isHealthy = await this.prisma.$queryRaw('SELECT 1');
    const result = this.getStatus('database', isHealthy);

    if (isHealthy) {
      return result;
    }
    throw new HealthCheckError('Database failed', result);
  }
}
