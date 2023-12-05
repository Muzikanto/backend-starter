import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { Gauge } from 'prom-client';

export abstract class BaseHealthIndicator extends HealthIndicator {
  abstract name: string;
  protected abstract gauge: Gauge<string>;

  public reportUnhealthy(): HealthIndicatorResult {
    return this.getStatus(this.name, false);
  }
}
