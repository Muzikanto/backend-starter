import { NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyMultipart from '@fastify/multipart';

export function fastifyExtend(app: NestFastifyApplication) {
  const fastify = app.getHttpAdapter().getInstance();

  // fastify.addHook('onRequest', (request, reply, done) => {
  //     reply.setHeader = function (key, value) {
  //         return this.raw.setHeader(key, value);
  //     };
  //     reply.end = function () {
  //         this.raw.end();
  //     };
  //     request.res = reply;
  //     done();
  // });
  // fastify.register(fastifyCookie, {
  //     // secret: "my-secret", // for cookies signature
  //     hook: 'onRequest', // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
  //     parseOptions: {}, // options for parsing cookies
  // });
  fastify.register(fastifyMultipart);
}
