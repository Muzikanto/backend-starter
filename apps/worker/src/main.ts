import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, VersioningType } from '@nestjs/common';
import { RmqOptions } from '@nestjs/microservices';
import { AppConfig } from '@packages/app';
import { WorkerClientRmqConfig } from '@packages/client-api/worker-client.rmq.config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ResponseInterceptor } from '@packages/nest';

const host = '0.0.0.0';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  app.useLogger(await app.resolve(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalInterceptors(new ResponseInterceptor());

  const config = app.get(AppConfig);

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // const rmqOptions: RmqOptions = app.get(WorkerClientRmqConfig).createClientOptions();
  // app.connectMicroservice(rmqOptions, { inheritAppConfig: false });

  // await app.startAllMicroservices();
  await app.listen(config.port, host);

  logger.debug(`Service is running on: ${await app.getUrl()}`);
  // logger.debug(`Service available on tcp://${host}:${tcpPort}`);
  // logger.debug(`Service available on amqp://${rmqOptions.options!.queue}`);
}

bootstrap();
