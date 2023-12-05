import { Global, Module } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import { ConfigService } from '@packages/config/config.service';
import { WorkerClientRmqConfig } from '@packages/client-api/worker-client.rmq.config';
import { AppConfig } from '@packages/app';
import path from 'path';
import { TypeormConfig } from '@packages/db/config/typeorm.config';
import { HealthConfig } from '@app/worker/src/health.config';
import { getToken, makeGaugeProvider } from '@willsoto/nestjs-prometheus';
import { WinstonConfig } from '@packages/logger';
import { SentryConfig } from '@packages/sentry';
import { TelegramConfig } from '@packages/telegram';
import { PrometheusConfig } from '@packages/metrics';

const providers = [
  // internal
  ConfigService,
  AppConfig,
  WorkerClientRmqConfig,
  WinstonConfig,
  SentryConfig,
  TelegramConfig,
  TypeormConfig,
  PrometheusConfig,
  HealthConfig,
  // app
];

@Global()
@Module({
  imports: [
    NestConfig.ConfigModule.forRoot({
      envFilePath: [path.resolve('./apps/worker/.env')],
    }),
  ],
  providers: [
    NestConfig.ConfigService,
    makeGaugeProvider({ name: 'http', help: 'Access to internet' }),
    makeGaugeProvider({ name: 'worker', help: 'Access to worker' }),
    ...providers,
  ],
  exports: [getToken('http'), getToken('worker'), ...providers],
})
export class ConfigModule {}
