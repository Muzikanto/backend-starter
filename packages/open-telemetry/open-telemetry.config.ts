import { Injectable } from '@nestjs/common';
import { IOpenTelemetryFactory, IOpenTelemetryOptions } from '@packages/open-telemetry/open-telemetry.types';
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
// import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
// import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ConfigService } from '@packages/config';

@Injectable()
export class OpenTelemetryConfig implements IOpenTelemetryFactory {
  protected readonly serviceName!: string;

  constructor(protected readonly configService: ConfigService) {
    this.serviceName = configService.getString('OTEL_NAME');
  }

  createOpenTelemetryConfig(): IOpenTelemetryOptions {
    const consoleExporter = new ConsoleSpanExporter();
    const spanProcessor = new SimpleSpanProcessor(consoleExporter);

    return {
      serviceName: this.serviceName,
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: this.serviceName, // update this to a more relevant name for you!
      }),
      spanProcessor,
      instrumentations: [new HttpInstrumentation(), new NestInstrumentation()],
    };
  }
}
