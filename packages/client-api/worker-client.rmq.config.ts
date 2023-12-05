import { Injectable } from '@nestjs/common';
import { ClientsModuleOptionsFactory, Transport } from '@nestjs/microservices';
import { RmqOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';
import { ConfigService } from '@packages/config/config.service';

@Injectable()
export class WorkerClientRmqConfig implements ClientsModuleOptionsFactory {
  private readonly host: string;
  private readonly port: number;
  private readonly queue: string;

  constructor(configService: ConfigService) {
    this.host = configService.getString('RABBITMQ_HOST');
    this.port = configService.getNumber('RABBITMQ_PORT');
    this.queue = configService.getString('RABBITMQ_WORKER_QUEUE');
  }

  createClientOptions(): RmqOptions {
    const url = `amqp://${this.host}:${this.port}`;

    return {
      transport: Transport.RMQ,
      options: {
        urls: [url],
        queue: this.queue,
        queueOptions: { durable: false },
      },
    };
  }
}
