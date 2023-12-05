import { Inject, Logger as NestLogger } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

export const prefixesForLoggers: string[] = new Array<string>();

export function Logger(prefix = '') {
  if (!prefixesForLoggers.includes(prefix)) {
    prefixesForLoggers.push(prefix);
  }

  return Inject(WINSTON_MODULE_NEST_PROVIDER);
}
