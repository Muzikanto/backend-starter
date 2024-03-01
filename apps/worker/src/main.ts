import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, VersioningType } from '@nestjs/common';
import { AppConfig } from '@packages/app';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ResponseInterceptor } from '@packages/nest';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getHttpConfigToken, HttpOptions } from '@packages/client-api';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter();

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter);
  app.useLogger(await app.resolve(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalInterceptors(new ResponseInterceptor());

  const config = app.get(AppConfig);

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  if (config.cors) {
    fastifyAdapter.enableCors(config.cors);
  }

  if (!config.isProduction) {
    const documentConfig = new DocumentBuilder()
      .setTitle(`${config.name} service`)
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'authorization')
      .addCookieAuth('authorization', { type: 'http', in: 'Header', scheme: 'Bearer' })
      .build();
    const document = SwaggerModule.createDocument(app, documentConfig);

    SwaggerModule.setup('swagger', app, document);
  }

  const httpOptions: HttpOptions = app.get(getHttpConfigToken('WORKER'));

  // const rmqOptions: RmqOptions = app.get(WorkerClientRmqConfig).createClientOptions();
  // app.connectMicroservice(rmqOptions, { inheritAppConfig: false });

  // await app.startAllMicroservices();
  await app.listen(httpOptions.port, '0.0.0.0');

  logger.debug(`Service is running on: ${await app.getUrl()}`);
  // logger.debug(`Service available on tcp://${host}:${tcpPort}`);
  // logger.debug(`Service available on amqp://${rmqOptions.options!.queue}`);
}

bootstrap();
