import { Provider } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { ITestingApplication, ITestingApplicationUtils } from './types';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from '@nestjs/microservices';
import { ThrottlerModule } from '@nestjs/throttler';
import { CqrsModule } from '@nestjs/cqrs';
import { ScheduleModule } from '@nestjs/schedule';
import { MockConfigModule } from '@packages/testing/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { withMockRedis } from '@packages/redis/testing';
import { WinstonModule } from 'nest-winston';
import { LoggerConfig } from '@packages/logger/logger.config';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { TelegrafModule } from 'nestjs-telegraf';
import { SentryConfig } from '@packages/sentry';
import { RedisConfig } from '@packages/redis';
import { withMockSentry } from '@packages/sentry/testing';
import { withMockDb } from '@packages/db/testing/withMockDb';
import { withMockTelegram } from '@packages/telegram/testing';
import { getTestingDataSource } from '@packages/db/testing';
import { createRmqProvider } from '@packages/client-api';

export const getTestingApplication = async (metadata: ModuleMetadata): Promise<ITestingApplication> => {
  const fastifyAdapter = new FastifyAdapter();

  // db
  const dataSource = await getTestingDataSource();

  const providers: Provider[] = [
    //
    ...(metadata.providers || []),
  ];

  let testingModule = Test.createTestingModule({
    ...metadata,
    imports: [
      MockConfigModule,
      //
      CqrsModule,
      ThrottlerModule.forRoot(),
      WinstonModule.forRootAsync({
        useClass: LoggerConfig,
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
      ClientsModule.registerAsync([createRmqProvider('WORKER')]),
      ...(metadata.imports || []),
    ],
    providers,
    exports: providers,
  });
  testingModule = withMockRedis(testingModule);
  testingModule = withMockSentry(testingModule);
  testingModule = withMockTelegram(testingModule);
  testingModule = withMockDb(testingModule, dataSource);

  const moduleFixture = await testingModule.compile();

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
