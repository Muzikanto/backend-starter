import { Provider } from '@nestjs/common';
import { ClientProvider, RmqOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@packages/config/config.service';
import { ClientsProviderAsyncOptions } from '@nestjs/microservices/module/interfaces/clients-module.interface';

export function getRmqConfigToken(key: string): string {
  return `RMQ_${key}_CONFIG`;
}

export function createRmqProvider(key: string): ClientsProviderAsyncOptions {
  return {
    name: key,
    useFactory: (config: ClientProvider) => {
      return config;
    },
    inject: [getRmqConfigToken(key)],
  };
}

export function createRmqConfig(key: string): Provider {
  return {
    provide: getRmqConfigToken(key),
    useFactory: (configService: ConfigService): RmqOptions => {
      const host = configService.getString('RABBITMQ_HOST');
      const port = configService.getNumber('RABBITMQ_PORT');
      const queue = configService.getString(`RABBITMQ_${key}_QUEUE`);

      const url = `amqp://${host}:${port}`;

      return {
        transport: Transport.RMQ,
        options: {
          urls: [url],
          queue: queue,
          queueOptions: { durable: false },
        },
      };
    },
    inject: [ConfigService],
  };
}
