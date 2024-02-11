import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { NodeSDKConfiguration } from '@opentelemetry/sdk-node/build/src/types';
import { NodeSDK } from '@opentelemetry/sdk-node';

export type IOpenTelemetryOptions = Partial<NodeSDKConfiguration>;
export type IOpenTelemetry = NodeSDK;

export interface IOpenTelemetryFactory {
  createOpenTelemetryConfig(): IOpenTelemetryOptions;
}

export interface IOpenTelemetryAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<IOpenTelemetryFactory>;
  useClass?: Type<IOpenTelemetryFactory>;
  inject?: any[];
}
