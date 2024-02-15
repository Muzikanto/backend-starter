import { Inject, Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Gauge } from 'prom-client';
import { IHealthConfig, IHealthConfigFactory, HealthIndicator, HttpHealthIndicator } from '@packages/health';
import { getHttpConfigToken, HttpOptions } from '@packages/client-api';

@Injectable()
export class HealthConfig implements IHealthConfigFactory {
  private readonly listOfThingsToMonitor: HealthIndicator[];

  constructor(
    @InjectMetric('http') protected httpGauge: Gauge<string>,
    @InjectMetric('worker') protected workerGauge: Gauge<string>,
    @Inject(getHttpConfigToken('WORKER')) protected readonly workerHttpConfig: HttpOptions
  ) {
    this.listOfThingsToMonitor = [
      new HttpHealthIndicator({ url: 'https://ya.ru', name: 'http' }, httpGauge),
      new HttpHealthIndicator({ url: `${this.workerHttpConfig.url}/api/ping`, name: 'worker' }, workerGauge),
    ];
  }

  createHealthConfig(): Promise<IHealthConfig> | IHealthConfig {
    return { arr: this.listOfThingsToMonitor };
  }
}
