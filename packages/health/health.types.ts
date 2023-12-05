import { HealthIndicator } from './indicator/health-indicator.types';
import { ModuleMetadata, Type } from '@nestjs/common';

export type IHealthConfig = { arr: HealthIndicator[] };
export interface IHealthConfigFactory {
  createHealthConfig(): Promise<IHealthConfig> | IHealthConfig;
}

export interface IHealthAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<IHealthConfigFactory>;
}
