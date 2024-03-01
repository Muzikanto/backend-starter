import { ClientOptions } from 'minio';
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export type IUploadModuleOptions = ClientOptions & { publicHost: string };

export interface IUploadOptionsFactory {
  createUploadOptions(): Promise<IUploadModuleOptions> | IUploadModuleOptions;
}

export interface IUploadModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<IUploadOptionsFactory>;
  useClass?: Type<IUploadOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<IUploadModuleOptions> | IUploadModuleOptions;
}
