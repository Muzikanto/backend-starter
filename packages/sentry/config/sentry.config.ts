import { ConfigService } from '@packages/config/config.service';
import { Injectable } from '@nestjs/common';
import { SentryModuleOptions, SentryOptionsFactory } from '@ntegral/nestjs-sentry';

@Injectable()
export class SentryConfig implements SentryOptionsFactory {
  protected readonly dsn: string;

  constructor(configService: ConfigService) {
    this.dsn = configService.getString('SENTRY_DSN');
  }

  createSentryModuleOptions(): SentryModuleOptions {
    return {
      dsn: this.dsn,
      debug: false,
      environment: process.env.NODE_ENV === 'production' ? 'production' : 'dev',
      logLevels: ['error'],
    };
  }
}
