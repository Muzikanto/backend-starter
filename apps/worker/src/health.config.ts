import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Gauge } from 'prom-client';
import { IHealthConfig, IHealthConfigFactory } from '@packages/health/health.types';
import { HealthIndicator, HttpHealthIndicator } from '@packages/health';

@Injectable()
export class HealthConfig implements IHealthConfigFactory {
  private readonly listOfThingsToMonitor: HealthIndicator[];

  constructor(
    @InjectMetric('http') protected http: Gauge<string>,
    @InjectMetric('worker') protected worker: Gauge<string>
  ) {
    this.listOfThingsToMonitor = [new HttpHealthIndicator('https://google.com', http)];
  }

  createHealthConfig(): Promise<IHealthConfig> | IHealthConfig {
    return { arr: this.listOfThingsToMonitor };
  }
}
