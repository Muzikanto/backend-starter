import { Injectable } from '@nestjs/common';
import { ConfigService } from '@packages/config/config.service';
import { ClientsModuleOptionsFactory, TcpClientOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class GatewayClientTcpConfig implements ClientsModuleOptionsFactory {
  private readonly host: string;
  private readonly port: number;

  constructor(configService: ConfigService) {
    this.host = configService.getString('TCP_GATEWAY_HOST');
    this.port = configService.getNumber('TCP_GATEWAY_PORT');
  }

  createClientOptions(): TcpClientOptions {
    return {
      transport: Transport.TCP,
      options: {
        port: this.port,
        host: this.host,
      },
    };
  }
}
