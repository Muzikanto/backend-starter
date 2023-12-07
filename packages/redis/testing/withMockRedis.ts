import { TestingModuleBuilder } from '@nestjs/testing';
import { getRedisToken } from '@liaoliaots/nestjs-redis';
import { MockRedis } from '@packages/redis/testing/MockRedis';
import { RedisConfig } from '@packages/redis';
import { MockRedisConfig } from '@packages/redis/testing/MockRedisConfig';

export function withMockRedis(app: TestingModuleBuilder): TestingModuleBuilder {
  return app
    .overrideProvider(getRedisToken('default'))
    .useClass(MockRedis)
    .overrideProvider(RedisConfig)
    .useClass(MockRedisConfig);
}
