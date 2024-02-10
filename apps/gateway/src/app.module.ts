import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionInterceptor } from '@packages/nest';
import { ConfigModule } from './config.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthModule } from '@packages/health';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfig } from '@packages/db';
import { HealthConfig } from '@app/gateway/src/health.config';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { LoggerConfig, LoggerModule } from '@packages/logger';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramConfig } from '@packages/telegram';
import { SentryConfig } from '@packages/sentry';
import { PrometheusConfig } from '@packages/metrics';
import { ExampleApplicationModule } from '@core/example/application-module';
import { KeycloakConfig } from '@packages/keycloak';
import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { UserApplicationModule } from '@core/user/application-module';
import { AuthApplicationModule } from '@core/auth/application-module';

@Module({
  imports: [
    ConfigModule,
    ThrottlerModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: TypeormConfig,
    }),
    LoggerModule.register({
      imports: [ConfigModule],
      useClass: LoggerConfig,
    }),
    SentryModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: SentryConfig,
    }),
    TelegrafModule.forRootAsync({
      useExisting: TelegramConfig,
      imports: [ConfigModule],
    }),
    PrometheusModule.registerAsync({
      imports: [ConfigModule],
      useExisting: PrometheusConfig,
    }),
    HealthModule.forRootAsync({
      useExisting: HealthConfig,
      imports: [ConfigModule],
    }),
    KeycloakConnectModule.registerAsync({
      imports: [ConfigModule],
      useExisting: KeycloakConfig,
    }),
    // App
    ExampleApplicationModule.forMonolith(),
    UserApplicationModule.forMonolith(),
    AuthApplicationModule.forMonolith(),
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ExceptionInterceptor }],
})
export class AppModule {}
