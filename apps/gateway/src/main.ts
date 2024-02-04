import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, VersioningType } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TcpOptions } from '@nestjs/microservices';
import { ResponseInterceptor } from '@packages/nest';
import { AppConfig } from '@packages/app';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { getTcpConfigToken } from '@packages/client-api/create-tcp-config';
import { getHttpConfigToken, HttpOptions } from '@packages/client-api';

const logger = new ConsoleLogger('Bootstrap');

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

  if (!config.isProduction) {
    const documentConfig = new DocumentBuilder()
      .setTitle('Gateway service')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'authorization')
      .addCookieAuth('authorization', { type: 'http', in: 'Header', scheme: 'Bearer' })
      .build();
    const document = SwaggerModule.createDocument(app, documentConfig);

    SwaggerModule.setup('swagger', app, document);
  }

  const httpOptions: HttpOptions = app.get(getHttpConfigToken('GATEWAY'));

  const tcpOptions: TcpOptions = app.get(getTcpConfigToken('GATEWAY'));
  app.connectMicroservice(tcpOptions, { inheritAppConfig: false });

  await app.startAllMicroservices();
  await app.listen(httpOptions.port, '0.0.0.0');

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  logger.debug(`Service available on tcp://${tcpOptions.options!.host}:${tcpOptions.options!.port}`);
  logger.debug(`Service is running on: ${await app.getUrl()}`);
}
bootstrap().catch((err) => {
  console.log(err);
  throw err;
});
