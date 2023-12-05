import { Inject } from '@nestjs/common';
import { ClientsProviderAsyncOptions } from '@nestjs/microservices/module/interfaces/clients-module.interface';
import { WorkerClientRmqConfig } from './worker-client.rmq.config';

const WORKER_RMQ_CLIENT_KEY = 'WORKER_CLIENT';
export const InjectWorkerRmqClient = (): ParameterDecorator => Inject(WORKER_RMQ_CLIENT_KEY);
export const WorkerClientRmqProvider: ClientsProviderAsyncOptions = {
  name: WORKER_RMQ_CLIENT_KEY,
  useClass: WorkerClientRmqConfig,
  imports: [],
};
