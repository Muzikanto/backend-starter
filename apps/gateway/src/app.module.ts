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
import { SentryConfig } from '@packages/sentry';
import { PrometheusConfig } from '@packages/metrics';
import { ExampleApplicationModule } from '@core/example/application-module';
import { UserApplicationModule } from '@core/user/application-module';
import { AuthApplicationModule } from '@core/auth/application-module';
import { AuthModule } from '@core/auth/core/auth.module';
import { AuthConfig } from '@core/auth/core';
import { OpenTelemetryConfig, OpenTelemetryModule } from '@packages/open-telemetry';
import { PingModule } from '@packages/ping';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ClientStaticConfig } from '@packages/client-static';
import { MailerModule } from '@nestjs-modules/mailer';
import { SmtpConfig } from '@packages/smtp';

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
    // TelegrafModule.forRootAsync({
    //   useExisting: TelegramConfig,
    //   imports: [ConfigModule],
    // }),
    PrometheusModule.registerAsync({
      imports: [ConfigModule],
      useExisting: PrometheusConfig,
    }),
    HealthModule.forRootAsync({
      useExisting: HealthConfig,
      imports: [ConfigModule],
    }),
    OpenTelemetryModule.forRootAsync({
      useExisting: OpenTelemetryConfig,
      imports: [ConfigModule],
    }),
    AuthModule.registerAsync({
      imports: [ConfigModule],
      useExisting: AuthConfig,
    }),
    PingModule,
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ClientStaticConfig,
    }),
    // MailerModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useExisting: SmtpConfig,
    // }),
    // App
    ExampleApplicationModule.forMonolith(),
    UserApplicationModule.forMonolith(),
    AuthApplicationModule.forMonolith(),
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ExceptionInterceptor }],
})
export class AppModule {}
