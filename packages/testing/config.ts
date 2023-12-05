import { Global, Module } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { WorkerClientRmqConfig } from '@packages/client-api/worker-client.rmq.config';
import { WinstonConfig } from '@packages/logger/winston.config';
import { TelegramChatConfig, TelegramConfig } from '@packages/telegram';
import { SentryConfig } from '@packages/sentry';
import { ConfigService } from '@packages/config';
import { RedisConfig } from '@packages/redis';
import { AppConfig } from '@packages/app';

process.env.RABBITMQ_HOST = 'test';
process.env.RABBITMQ_PORT = '1';
process.env.RABBITMQ_USER = 'test';
process.env.RABBITMQ_PASSWORD = 'test';
process.env.RABBITMQ_WORKER_QUEUE = 'test';
process.env.RABBITMQ_GAME_SERVER_QUEUE = 'test';
process.env.RABBITMQ_GATEWAY_QUEUE = 'test';

process.env.AUTH_SECRET = 'test';

process.env.LOGGER_LEVEL = 'error';

process.env.TELEGRAM_CHAT_ID = 'test';
process.env.TELEGRAM_TOKEN = 'test';

process.env.TCP_GATEWAY_HOST = 'test';
process.env.TCP_GATEWAY_PORT = '1';

process.env.TCP_GAME_SERVER_COUNT = '1';
process.env.TCP_GAME_SERVER_0_HOST = 'test';
process.env.TCP_GAME_SERVER_0_PORT = '1';
process.env.TCP_GAME_SERVER_1_HOST = 'test';
process.env.TCP_GAME_SERVER_1_PORT = '1';

process.env.APP_NAME = '1';
process.env.PORT = '1';
process.env.HOST = '1';
process.env.NODE_ENV = '1';
process.env.APP_ID = '1';
process.env.APP_PNAME = '1';

process.env.GAME_WORLD_SPEED = '10';

process.env.REDIS_HOST = '_';
process.env.REDIS_PORT = '0';
process.env.REDIS_USER = '_';
process.env.REDIS_PASSWORD = '_';

process.env.SENTRY_DSN = 'https://test@test.sentry.io/test';

const configProviders = [
  ConfigService,
  NestConfigService,
  WorkerClientRmqConfig,
  TelegramChatConfig,
  RedisConfig,
  WinstonConfig,
  SentryConfig,
  TelegramConfig,
  AppConfig,
];

@Global()
@Module({
  providers: configProviders,
  exports: configProviders,
})
export class MockConfigModule {}
