import { getParsedResult } from '../utils/logger.helpers';
import { Logger } from './logger.decorator';
import { LoggerService } from '@nestjs/common';

export const SERVICE_LOGGER_KEY = 'logger';

// eslint-disable-next-line
export function MethodLogger(
  opts: { name?: string; debug?: boolean; formatResponse?: (res: any) => string } = { debug: true }
): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    // get original method
    const originalMethod = descriptor.value;
    const constructorName = target.constructor.name;

    let logger: LoggerService = target[SERVICE_LOGGER_KEY];

    if (!logger) {
      Logger(opts.name || constructorName)(target, SERVICE_LOGGER_KEY);
    }

    descriptor.value = async function (this: any, ...args: any[]) {
      logger = this[SERVICE_LOGGER_KEY] as LoggerService;

      const start = new Date().getTime();

      try {
        const result = await originalMethod.apply(this, args);

        if (opts.debug) {
          const end = new Date().getTime();
          const time = end - start;

          const ctx = {
            name: opts.name || constructorName,
            target: constructorName,
            method: propertyKey.toString(),
            args,
            res: opts.formatResponse ? opts.formatResponse(result) : result,
            time,
          };

          const message = `${time}ms ${ctx.method}(${getParsedResult(ctx.args)}) => ${
            getParsedResult(ctx.res) || 'void'
          }`;

          logger.debug!(message, ctx.target);
        }

        return result;
      } catch (e) {
        (e as any).extra = {
          name: opts.name || constructorName,
          target: constructorName,
          method: propertyKey.toString(),
          args: JSON.stringify(args),
        };

        throw e;
      }
    };
  };
}
