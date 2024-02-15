import { DynamicModule, Module, OnModuleInit, Provider } from '@nestjs/common';
import { InjectOtel, OPEN_TELEMETRY_TOKEN } from '@packages/open-telemetry/open-telemetry.inject';
import {
  IOpenTelemetry,
  IOpenTelemetryAsyncOptions,
  IOpenTelemetryFactory,
} from '@packages/open-telemetry/open-telemetry.types';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConfigService } from '@packages/config';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Module({})
export class OpenTelemetryModule implements OnModuleInit {
  constructor(@InjectOtel() protected readonly otel: IOpenTelemetry) {}

  onModuleInit() {
    // console.log(this.otel);
  }

  public static forRootAsync(metadata: IOpenTelemetryAsyncOptions): DynamicModule {
    const config = new ConfigService(new NestConfigService());
    let otlFactory: IOpenTelemetryFactory;

    if (metadata.useExisting) {
      otlFactory = new metadata.useExisting(config);
    } else if (metadata.useClass) {
      otlFactory = new metadata.useClass(config);
    } else {
      throw new Error('invalid open-telemetry metadata');
    }

    const otlSdk = new NodeSDK(otlFactory.createOpenTelemetryConfig());

    otlSdk.start();

    const service: Provider = {
      provide: OPEN_TELEMETRY_TOKEN,
      useFactory: () => otlSdk,
      inject: [],
    };

    return {
      global: true,
      module: OpenTelemetryModule,
      providers: [service],
      exports: [],
    };
  }
}
