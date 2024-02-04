import { Provider } from '@nestjs/common';
import { ClientProvider, TcpOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@packages/config/config.service';
import { ClientsProviderAsyncOptions } from '@nestjs/microservices/module/interfaces/clients-module.interface';

export function getTcpConfigToken(key: string): string {
  return `TCP_${key}_CONFIG`;
}

export function createTcpProvider(key: string): ClientsProviderAsyncOptions {
  return {
    name: key,
    useFactory: (config: ClientProvider) => {
      return config;
    },
    inject: [getTcpConfigToken(key)],
  };
}

export function createTcpConfig(key: string): Provider {
  return {
    provide: getTcpConfigToken(key),
    useFactory: (configService: ConfigService): TcpOptions => {
      const host = configService.getString(`TCP_${key}_HOST`);
      const port = configService.getNumber(`TCP_${key}_PORT`);

      return {
        transport: Transport.TCP,
        options: {
          port: port,
          host: host,
        },
      };
    },
    inject: [ConfigService],
  };
}
