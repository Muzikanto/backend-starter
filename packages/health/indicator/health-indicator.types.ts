import { HealthIndicatorResult } from '@nestjs/terminus';

export interface HealthIndicator {
  name: string;
  isHealthy(): Promise<HealthIndicatorResult>;
  reportUnhealthy(): HealthIndicatorResult;
}
