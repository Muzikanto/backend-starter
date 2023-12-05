import { Global, Module, Provider } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import * as path from 'path';
import { ConfigService } from '@packages/config';
import { GatewayClientRmqConfig, GatewayClientTcpConfig } from '@packages/client-api';
import { AppConfig } from '@packages/app';
import { TypeormConfig } from '@packages/db/config/typeorm.config';
import { HealthConfig } from '@app/gateway/src/health.config';
import { getToken, makeGaugeProvider } from '@willsoto/nestjs-prometheus';
import { WinstonConfig } from '@packages/logger';

import { PrometheusConfig } from '@packages/metrics';
import { TelegramChatConfig, TelegramConfig } from '@packages/telegram';
import { SentryConfig } from '@packages/sentry';
import { RedisConfig } from '@packages/redis';

const providers: Provider[] = [
  // internal
  ConfigService,
  AppConfig,
  GatewayClientRmqConfig,
  GatewayClientTcpConfig,
  WinstonConfig,
  PrometheusConfig,
  HealthConfig,
  TypeormConfig,
  RedisConfig,
  TelegramConfig,
  TelegramChatConfig,
  SentryConfig,
  // app
];

@Global()
@Module({
  imports: [
    NestConfig.ConfigModule.forRoot({
      envFilePath: [path.resolve('./apps/gateway/.env')],
    }),
  ],
  providers: [...providers, NestConfig.ConfigService, makeGaugeProvider({ name: 'test', help: 'Http' })],
  exports: [...providers, getToken('test')],
})
export class ConfigModule {}
