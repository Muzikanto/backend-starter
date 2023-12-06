import { HealthIndicatorResult } from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';
import { Gauge } from 'prom-client';
import { BaseHealthIndicator, HealthIndicator } from '@packages/health';
import { ElkService } from '../elk.service';

@Injectable()
export class ElkHealthIndicator extends BaseHealthIndicator implements HealthIndicator {
  public readonly name = 'Elk';
  protected readonly help = 'Status of ' + this.name;

  constructor(protected readonly service: ElkService, protected readonly gauge: Gauge<string>) {
    super();
  }

  public async isHealthy(): Promise<HealthIndicatorResult> {
    try {
      await this.service.health();

      // const result: Promise<HealthIndicatorResult> = this.httpHealthIndicator.pingCheck(this.name, this.url);
      // if the api dependency isn't available, HealthCheckService
      // of Terminus throws an error that need to be catched in the HealthService
      this.gauge.set(Math.round(Math.random() * 100));

      return { [this.name]: { status: 'up' } };
    } catch (e) {
      this.gauge.set(0);
      throw e;
    }
  }
}
