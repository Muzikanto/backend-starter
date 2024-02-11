import { Global, Module, Provider } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import { ConfigService } from '@packages/config/config.service';
import { AppConfig } from '@packages/app';
import path from 'path';
import { TypeormConfig } from '@packages/db/config/typeorm.config';
import { HealthConfig } from '@app/worker/src/health.config';
import { getToken, makeGaugeProvider } from '@willsoto/nestjs-prometheus';
import { LoggerConfig } from '@packages/logger';
import { SentryConfig } from '@packages/sentry';
import { TelegramConfig } from '@packages/telegram';
import { PrometheusConfig } from '@packages/metrics';
import { createHttpConfig, createRmqConfig } from '@packages/client-api';

const configs = [
  // clients
  createRmqConfig('WORKER'),
  createHttpConfig('WORKER'),
  // data-sources
  TypeormConfig,
  // metrics
  PrometheusConfig,
  HealthConfig,
  // logs
  LoggerConfig,
  SentryConfig,
  TelegramConfig,
  // internal
  ConfigService,
  AppConfig,

  // app
];

const metricProviders: Provider[] = [makeGaugeProvider({ name: 'http', help: 'Check access to internet' })];
const metricExports: string[] = [getToken('http')];

@Global()
@Module({
  imports: [
    NestConfig.ConfigModule.forRoot({
      envFilePath: [path.resolve('./apps/worker/.env')],
    }),
  ],
  providers: [NestConfig.ConfigService, ...metricProviders, ...configs],
  exports: [...metricExports, ...configs],
})
export class ConfigModule {}
