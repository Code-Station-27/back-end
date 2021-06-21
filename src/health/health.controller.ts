import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { Public } from 'src/shared/decorators/public.decorator';

import { PrismaHealthIndicator } from './prisma.health';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private prismaHealthIndicator: PrismaHealthIndicator,
  ) {}

  @Public()
  @Get('check')
  check(): { ok: boolean } {
    return { ok: true };
  }

  @Public()
  @Get()
  @HealthCheck()
  healthCheck(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.http.pingCheck('server', 'http://localhost:3000/health/check'),
      () => this.prismaHealthIndicator.isHealthy(),
    ]);
  }
}
