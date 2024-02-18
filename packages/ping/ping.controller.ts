import { Controller, Get, Logger } from '@nestjs/common';

@Controller('/ping')
export class PingController {
  constructor(protected readonly logger: Logger) {}

  @Get()
  public async get(): Promise<string> {
    return 'ok';
  }
}
