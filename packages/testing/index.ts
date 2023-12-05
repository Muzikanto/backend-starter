import { Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { ITestingApplication, ITestingApplicationUtils } from './types';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from '@nestjs/microservices';
import { ThrottlerModule } from '@nestjs/throttler';
import { CqrsModule } from '@nestjs/cqrs';
import { ScheduleModule } from '@nestjs/schedule';
import { getTestingDataSource } from '@packages/testing/db/init-db';
import { MockConfigModule } from '@packages/testing/config';
import { WorkerClientRmqProvider } from '@packages/client-api/worker-client.rmq.inject';
import { getRedisToken, RedisModule } from '@liaoliaots/nestjs-redis';
import { MockRedis, MockRedisConfig } from '@packages/redis/testing';
import { WinstonModule } from 'nest-winston';
import { WinstonConfig } from '@packages/logger/winston.config';
import { SENTRY_TOKEN, SentryModule } from '@ntegral/nestjs-sentry';
import { getBotToken, TelegrafModule } from 'nestjs-telegraf';
import { getMockTelegrafBot } from '@packages/telegram/testing/getMockTelegrafBot';
import { SentryConfig } from '@packages/sentry';
import { RedisConfig } from '@packages/redis';
import { getMockSentry } from '@packages/sentry/testing';

export const getTestingApplication = async (metadata: ModuleMetadata): Promise<ITestingApplication> => {
  const fastifyAdapter = new FastifyAdapter();

  // db
  const dataSource = await getTestingDataSource();

  const providers: Provider[] = [
    //
    ...(metadata.providers || []),
  ];

  const moduleFixture: TestingModule = await Test.createTestingModule({
    ...metadata,
    imports: [
      MockConfigModule,
      //
      CqrsModule,
      ThrottlerModule.forRoot(),
      WinstonModule.forRootAsync({
        useClass: WinstonConfig,
      }),
      SentryModule.forRootAsync({
        useExisting: SentryConfig,
      }),
      TelegrafModule.forRootAsync({
        useFactory: () => ({
          token: 'test',
        }),
      }),
      TypeOrmModule.forRoot({
        name: 'default',
        synchronize: true,
        autoLoadEntities: true,
      }),
      RedisModule.forRootAsync({
        useExisting: RedisConfig,
      }),
      ScheduleModule.forRoot(),
      ClientsModule.registerAsync([WorkerClientRmqProvider]),
      ...(metadata.imports || []),
    ],
    providers,
    exports: providers,
  })
    // override datasource
    .overrideProvider(getDataSourceToken('default'))
    .useValue(dataSource)
    // override telegram
    .overrideProvider(getBotToken())
    .useValue(getMockTelegrafBot())
    // redis
    .overrideProvider(getRedisToken('default'))
    .useClass(MockRedis)
    .overrideProvider(RedisConfig)
    .useClass(MockRedisConfig)
    // logger
    .overrideProvider(SENTRY_TOKEN)
    .useValue(getMockSentry())
    //
    .compile();

  const app = moduleFixture.createNestApplication<NestFastifyApplication>(fastifyAdapter, { logger: ['error'] });
  app.useLogger(['error']);

  await app.init();
  await app.getHttpAdapter().getInstance().ready();

  const utils: ITestingApplicationUtils = {
    injectPost: async ({ url, args, token, handleError }) => {
      const headers: { [key: string]: string } = {};

      if (token) {
        headers.authorization = token;
      }

      const result = await app.inject({
        method: 'POST',
        url,
        payload: args || {},
        headers,
      });

      const data = result.body ? result.json() : (undefined as any);

      if (!handleError && data?.status >= 400) {
        console.log(data);
        throw new Error(JSON.stringify(data));
      }

      return {
        status: result.statusCode,
        // eslint-disable-next-line
        data,
      };
    },
    injectGet: async ({ url, args, token, handleError }) => {
      const headers: { [key: string]: string } = {};

      if (token) {
        headers.authorization = token;
      }

      const result = await app.inject({
        method: 'GET',
        url,
        query: args ? Object.keys(args).reduce((acc, k) => ({ ...acc, [k]: String((args as any)[k]) }), {}) : {},
        headers,
      });

      const data = result.body ? result.json() : (undefined as any);

      if (!handleError && data?.status >= 400) {
        console.log(data);
        throw new Error(JSON.stringify(data));
      }

      return {
        status: result.statusCode,
        // eslint-disable-next-line
        data,
      };
    },
    stop: async (): Promise<void> => {
      await app.close();

      if (global.gc) {
        global.gc();
      }
    },
  };

  Object.assign(app, utils);

  //

  return app as ITestingApplication;
};
