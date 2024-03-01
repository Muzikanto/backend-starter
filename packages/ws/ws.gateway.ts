import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LoggerService, UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GatewayMetadata } from '@nestjs/websockets/interfaces';
import { ValidationPipe, WsExceptionFilter } from '@packages/nest/index';
import { Logger } from '@packages/logger';
import { extractWsToken } from '@packages/ws/utils/extract-ws-token';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { IWsResponse, WsResponse } from '@packages/ws/utils/ws.response';
import { WsAuthUser } from './decorators/ws-auth-user.decorator';
import { WsAuthGuard } from '@packages/ws/guards/ws-auth.guard';

const wsCors: CorsOptions = {
  origin: (origin: string, callback: (err: Error | null, success: boolean) => void) => {
    callback(null, true);
  },
  allowedHeaders: ['authorization'],
};

const socketGatewayPort = +(process.env.WS_PORT as string);
const socketGatewayOptions: GatewayMetadata = {
  // namespace: 'example',
  cors: wsCors,
  allowEIO3: true,
};

@UseFilters(new WsExceptionFilter())
@UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
@WebSocketGateway(socketGatewayPort, socketGatewayOptions)
export class WsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() protected readonly ws!: Server;

  constructor(@Logger('WS') protected readonly logger: LoggerService, protected readonly commandBus: CommandBus) {
    //
  }

  afterInit(server: Server) {
    this.logger.debug?.(`WsGateway is running on ws://127.0.0.1:${socketGatewayPort}/socket.io`);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.debug?.(`Client Connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    this.logger.debug?.(`Client Disconnected: ${client.id}`);

    try {
      const token = extractWsToken(client);

      if (!token) {
        return;
      }

      // some code
    } catch (e) {
      console.log(e);
    }
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('connect')
  public async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: unknown,
    @WsAuthUser() userAuth: unknown
  ): Promise<IWsResponse> {
    this.logger.debug?.(`event: connect`);

    return new WsResponse({ status: 200 });
  }
}
