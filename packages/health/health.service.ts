import { Injectable, Logger } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HealthCheckResult } from '@nestjs/terminus';
import { IHealthConfig } from './health.types';
import { InjectHealthConfig } from './health.inject';
import { HealthIndicator } from './indicator/health-indicator.types';

@Injectable()
export class HealthService {
  constructor(
    @InjectHealthConfig() protected readonly healthConfig: IHealthConfig,
    private health: HealthCheckService
  ) {
    //
  }

  @HealthCheck()
  public async check(): Promise<HealthCheckResult | undefined> {
    return await this.health.check(
      this.healthConfig.arr.map((apiIndicator: HealthIndicator) => async () => {
        try {
          return await apiIndicator.isHealthy();
        } catch (e) {
          Logger.warn(e);
          return apiIndicator.reportUnhealthy();
        }
      })
    );
  }
}
