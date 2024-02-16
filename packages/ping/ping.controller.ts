import { Controller, Get, Logger } from '@nestjs/common';

@Controller('/ping')
export class PingController {
  constructor(protected readonly logger: Logger) {
    this.logger.error('test', 'test');
  }

  @Get()
  public async get(): Promise<string> {
    return 'ok';
  }
}
