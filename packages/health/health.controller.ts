import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { HealthCheckResult } from '@nestjs/terminus';
import { ApiOperation } from '@nestjs/swagger';
import { HealthService } from './health.service';
import { ClassLogger } from '@packages/logger';
import { DurationInterceptor } from '@packages/nest';

@ClassLogger()
@UseInterceptors(DurationInterceptor)
@Controller('/health')
export class HealthController {
  constructor(protected readonly healthService: HealthService) {
    //
  }

  @Get('/')
  @ApiOperation({})
  async check(): Promise<HealthCheckResult | undefined> {
    return await this.healthService.check();
  }
}
