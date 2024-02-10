import { DynamicModule, Logger, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { WinstonModuleAsyncOptions } from 'nest-winston/dist/winston.interfaces';

@Module({})
export class LoggerModule {
  public static register(opts: WinstonModuleAsyncOptions): DynamicModule {
    return {
      global: true,
      module: LoggerModule,
      imports: [WinstonModule.forRootAsync(opts)],
      providers: [Logger],
      exports: [Logger],
    };
  }
}
