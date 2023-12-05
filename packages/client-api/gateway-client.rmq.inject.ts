import { Inject } from '@nestjs/common';
import { ClientsProviderAsyncOptions } from '@nestjs/microservices/module/interfaces/clients-module.interface';
import { GatewayClientRmqConfig } from './gateway-client.rmq.config';

const GATEWAY_CLIENT_RMQ_KEY = 'GATEWAY_CLIENT_RMQ';
export const InjectGatewayRmqClient = (): ParameterDecorator => Inject(GATEWAY_CLIENT_RMQ_KEY);
export const GatewayClientRmqProvider: ClientsProviderAsyncOptions = {
  name: GATEWAY_CLIENT_RMQ_KEY,
  useClass: GatewayClientRmqConfig,
  imports: [],
};
