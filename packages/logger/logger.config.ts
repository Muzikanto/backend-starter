import { Injectable } from '@nestjs/common';
import { WinstonModuleOptions, WinstonModuleOptionsFactory } from 'nest-winston';
import { ConfigService } from '@packages/config/config.service';
import path from 'path';
import { transports as wTransports } from 'winston';
import { ConsoleTransport } from './module/transport/console.transport';

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

@Injectable()
export class LoggerConfig implements WinstonModuleOptionsFactory {
  public readonly dist?: string;
  public readonly level: string;

  constructor(configService: ConfigService) {
    const dist = configService.getRaw('LOGGER_DIST');

    this.dist = dist ? path.resolve(dist) : undefined;
    this.level = configService.getString('LOGGER_LEVEL');
  }

  createWinstonModuleOptions(): WinstonModuleOptions {
    const transports: any[] = [new ConsoleTransport()];
    const exceptionHandlers: any[] = [];
    const rejectionHandlers: any[] = [];

    if (this.dist) {
      const logsDist = path.resolve(this.dist);

      const fileTransport = new wTransports.File({ filename: 'file.log', dirname: logsDist });
      const exceptionsTransport = new wTransports.File({
        filename: 'exceptions.log',
        dirname: logsDist,
      });
      const rejectionTransport = new wTransports.File({
        filename: 'rejections.log',
        dirname: logsDist,
      });

      transports.push(fileTransport);
      exceptionHandlers.push(exceptionsTransport);
      rejectionHandlers.push(rejectionTransport);
    }

    return {
      level: this.level,
      levels: logLevels,
      transports,
      exceptionHandlers,
      rejectionHandlers,
      exitOnError: false,
    };
  }
}
