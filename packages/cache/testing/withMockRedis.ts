import { TestingModuleBuilder } from '@nestjs/testing';
import { getRedisToken } from '@liaoliaots/nestjs-redis';
import { MockRedis } from '@packages/cache/testing/MockRedis';
import { RedisConfig } from '@packages/cache';
import { MockRedisConfig } from '@packages/cache/testing/MockRedisConfig';

export function withMockRedis(app: TestingModuleBuilder): TestingModuleBuilder {
  return app
    .overrideProvider(getRedisToken('default'))
    .useClass(MockRedis)
    .overrideProvider(RedisConfig)
    .useClass(MockRedisConfig);
}
