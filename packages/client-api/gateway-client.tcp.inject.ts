import { Inject } from '@nestjs/common';
import { ClientsProviderAsyncOptions } from '@nestjs/microservices/module/interfaces/clients-module.interface';
import { GatewayClientTcpConfig } from './gateway-client.tcp.config';

const GATEWAY_CLIENT_KEY = 'GATEWAY_CLIENT';
export const InjectGatewayClient = (): ParameterDecorator => Inject(GATEWAY_CLIENT_KEY);
export const GatewayClientProvider: ClientsProviderAsyncOptions = {
  name: GATEWAY_CLIENT_KEY,
  useClass: GatewayClientTcpConfig,
  imports: [],
};
