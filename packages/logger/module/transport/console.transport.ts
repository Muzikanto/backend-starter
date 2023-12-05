import Transport from 'winston-transport';
import { ConsoleLogger } from '@nestjs/common';

export class ConsoleTransport extends Transport {
  protected consoleLogger: ConsoleLogger;

  constructor(prefix = 'Logger') {
    super();

    this.consoleLogger = new ConsoleLogger(prefix);
  }

  log(
    info: { message: string; level: 'debug' | 'error' | 'info'; context?: string; stack?: string[] },
    callback: () => void
  ) {
    if (info.level === 'info') {
      this.consoleLogger.log(info.message, info.context);
    } else if (info.level === 'error') {
      this.consoleLogger.error(info.message, info.stack?.join(''), info.context);
    } else {
      this.consoleLogger[info.level](info.message, info.context);
    }

    callback();
  }
}
