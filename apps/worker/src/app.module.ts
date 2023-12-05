import { Module } from '@nestjs/common';
import { ExceptionInterceptor } from '@packages/nest';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@app/worker/src/config.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfig } from '@packages/db/config/typeorm.config';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { HealthConfig } from '@app/worker/src/health.config';
import { WinstonModule } from 'nest-winston';
import { WinstonConfig, LoggerModule } from '@packages/logger';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { TelegrafModule } from 'nestjs-telegraf';
import { HealthModule } from '@packages/health';
import { TelegramConfig } from '@packages/telegram';
import { SentryConfig } from '@packages/sentry';
import { PrometheusConfig } from '@packages/metrics';
import { KeyValueModule } from '@packages/key-value';

@Module({
  imports: [
    ConfigModule,
    ThrottlerModule.forRoot(),
    ScheduleModule.forRoot(),
    LoggerModule,
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useClass: WinstonConfig,
    }),
    SentryModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: SentryConfig,
    }),
    TelegrafModule.forRootAsync({
      useExisting: TelegramConfig,
      imports: [ConfigModule],
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useExisting: TypeormConfig,
    // }),
    // KeyValueModule,
    PrometheusModule.registerAsync({
      imports: [ConfigModule],
      useExisting: PrometheusConfig,
    }),
    HealthModule.forRootAsync({
      useExisting: HealthConfig,
      imports: [ConfigModule],
    }),
    // ===== APP =====
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ExceptionInterceptor }],
})
export class AppModule {}
