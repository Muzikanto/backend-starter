import { DynamicModule, Module, Provider } from '@nestjs/common';
import { IUploadModuleAsyncOptions, IUploadModuleOptions, IUploadOptionsFactory } from './upload.types';
import { UPLOAD_CONFIG_KEY } from '@packages/upload/upload.inject';
import UploadService from '@packages/upload/upload.service';

@Module({})
export class UploadModule {
  public static registerAsync(opts: IUploadModuleAsyncOptions): DynamicModule {
    const config: Provider = {
      provide: UPLOAD_CONFIG_KEY,
      useClass: opts.useClass,
      imports: opts.imports,
      useFactory: (config: IUploadOptionsFactory) => {
        return config.createUploadOptions();
      },
      inject: opts.useExisting ? [opts.useExisting] : undefined,
    } as Provider;

    return {
      module: UploadModule,
      providers: [
        config,
        {
          provide: UploadService,
          useFactory: async (uploadConfig: IUploadModuleOptions): Promise<UploadService> => {
            const service = new UploadService(uploadConfig);

            return service;
          },
          inject: [UPLOAD_CONFIG_KEY],
        },
      ],
      exports: [UploadService],
    };
  }
}
