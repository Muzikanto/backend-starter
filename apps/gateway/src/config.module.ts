import { Global, Module, Provider } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import * as path from 'path';
import { ConfigService } from '@packages/config';
import { AppConfig } from '@packages/app';
import { TypeormConfig } from '@packages/db';
import { HealthConfig } from '@app/gateway/src/health.config';
import { getToken, makeGaugeProvider } from '@willsoto/nestjs-prometheus';
import { LoggerConfig } from '@packages/logger';

import { PrometheusConfig } from '@packages/metrics';
import { TelegramChatConfig, TelegramConfig } from '@packages/telegram';
import { SentryConfig } from '@packages/sentry';
import { RedisConfig } from '@packages/cache';
import { createTcpConfig } from '@packages/client-api/create-tcp-config';
import { createRmqConfig } from '@packages/client-api/create-rmq-config';
import { createHttpConfig } from '@packages/client-api';
import { AuthConfig } from '@core/auth/core';
import { OpenTelemetryConfig } from '@packages/open-telemetry';

const configs: Provider[] = [
  // clients
  createRmqConfig('GATEWAY'),
  createTcpConfig('GATEWAY'),
  createHttpConfig('WORKER'),
  createHttpConfig('GATEWAY'),
  // data-sources
  RedisConfig,
  TypeormConfig,
  // metrics
  PrometheusConfig,
  HealthConfig,
  OpenTelemetryConfig,
  // logs
  LoggerConfig,
  TelegramConfig,
  TelegramChatConfig,
  SentryConfig,
  // internal
  AuthConfig,
  ConfigService,
  AppConfig,
  // app
];
const metricProviders: Provider[] = [
  makeGaugeProvider({ name: 'http', help: 'Check access to internet' }),
  makeGaugeProvider({ name: 'worker', help: 'Check access to worker' }),
];
const metricExports: string[] = [getToken('http'), getToken('worker')];

@Global()
@Module({
  imports: [
    NestConfig.ConfigModule.forRoot({
      envFilePath: [path.resolve('./apps/gateway/.env')],
    }),
  ],
  providers: [...configs, NestConfig.ConfigService, ...metricProviders],
  exports: [...configs, ...metricExports],
})
export class ConfigModule {}
