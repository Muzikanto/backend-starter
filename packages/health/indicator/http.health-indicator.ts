import { HealthIndicatorResult } from '@nestjs/terminus';
import { HealthIndicator } from './health-indicator.types';
import { BaseHealthIndicator } from './health-indicator';
import axios from 'axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Gauge } from 'prom-client';

@Injectable()
export class HttpHealthIndicator extends BaseHealthIndicator implements HealthIndicator {
  public name: string;

  constructor(
    protected readonly config: { name: string; url: string; help?: string },
    protected readonly gauge: Gauge<string>
  ) {
    super();

    this.name = config.name;
  }

  public async isHealthy(): Promise<HealthIndicatorResult> {
    try {
      await axios.get(this.config.url);

      // const result: Promise<HealthIndicatorResult> = this.httpHealthIndicator.pingCheck(this.name, this.url);
      // if the api dependency isn't available, HealthCheckService
      // of Terminus throws an error that need to be catched in the HealthService
      this.gauge.set(Math.round(Math.random() * 100));

      return { [this.name]: { status: 'up' } };
    } catch (e) {
      this.gauge.set(0);
      throw new InternalServerErrorException({ message: (e as Error).message });
    }
  }
}
