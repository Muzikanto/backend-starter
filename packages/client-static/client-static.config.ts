import { ConfigService } from '@packages/config/config.service';
import { Injectable } from '@nestjs/common';
import {
  ServeStaticModuleOptions,
  ServeStaticModuleOptionsFactory,
} from '@nestjs/serve-static/dist/interfaces/serve-static-options.interface';
import path from 'path';

@Injectable()
export class ClientStaticConfig implements ServeStaticModuleOptionsFactory {
  constructor(protected readonly configService: ConfigService) {}

  createLoggerOptions(): ServeStaticModuleOptions[] | Promise<ServeStaticModuleOptions[]> {
    return [
      {
        rootPath: path.resolve(this.configService.getString('SERVE_STATIC_PATH')),
      },
    ];
  }
}
