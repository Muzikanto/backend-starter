import { DynamicModule, Module } from '@nestjs/common';
import { IElkAsyncOptions } from '@packages/elastic';
import { ElkService } from '@packages/elastic/module/elk.service';

@Module({})
export class ElkModule {
  public static forRootAsync(metadata: IElkAsyncOptions): DynamicModule {
    return {
      global: true,
      module: ElkModule,
      imports: [...(metadata.imports || [])],
      providers: [ElkService, ...(metadata.providers || [])],
      exports: [ElkService],
    };
  }
}
