import { Controller, Get } from '@nestjs/common';

@Controller('/ping')
export class PingController {
  @Get()
  public async get(): Promise<string> {
    return 'ok';
  }
}
