import { RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { RedisConfig } from '@packages/redis';

@Injectable()
export class MockRedisConfig extends RedisConfig {
  async createRedisOptions(): Promise<RedisModuleOptions> {
    return {
      closeClient: true,
    };
  }
}
