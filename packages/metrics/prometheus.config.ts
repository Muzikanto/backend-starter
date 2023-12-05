import { ConfigService } from '@packages/config/config.service';
import { Injectable } from '@nestjs/common';
import { PrometheusOptions, PrometheusOptionsFactory } from '@willsoto/nestjs-prometheus/dist/interfaces';

@Injectable()
export class PrometheusConfig implements PrometheusOptionsFactory {
  protected readonly name: string;
  protected readonly pushGatewayUrl?: string;

  constructor(configService: ConfigService) {
    this.name = configService.getString('APP_NAME');
    this.pushGatewayUrl = configService.getRaw('PUSHGATEWAY_URL');
  }

  createPrometheusOptions(): PrometheusOptions {
    return {
      global: true,
      path: '/metrics',
      defaultMetrics: { enabled: true },
      defaultLabels: { app: this.name },
      customMetricPrefix: 'app',
      pushgateway: this.pushGatewayUrl
        ? {
            url: this.pushGatewayUrl,
          }
        : undefined,
    };
  }
}
