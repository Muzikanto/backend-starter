import { WebSocketAdapter, INestApplicationContext } from '@nestjs/common';
import { MessageMappingProperties } from '@nestjs/websockets';
import { Observable, fromEvent, EMPTY } from 'rxjs';
import { mergeMap, filter } from 'rxjs/operators';
import { Server } from 'socket.io';
import { createServer } from 'http';

export class WsLocalhostAdapter implements WebSocketAdapter {
  constructor(protected readonly app: INestApplicationContext) {}

  create(port: number, options: any = {}): any {
    const httpServer = createServer();
    const io = new Server(httpServer, {
      ...options,
    });

    httpServer.listen(port, '0.0.0.0').listen(port, '::');

    return io;
  }

  bindClientConnect(server: any, callback: (...args: any) => void): void {
    server.on('connection', callback);
  }

  bindMessageHandlers(client: any, handlers: MessageMappingProperties[], process: (data: any) => Observable<any>) {
    fromEvent(client, 'message')
      .pipe(
        mergeMap((data) => this.bindMessageHandler(data, handlers, process)),
        filter((result) => result)
      )
      .subscribe((response) => client.send(JSON.stringify(response)));
  }

  bindMessageHandler(
    buffer: any,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>
  ): Observable<any> {
    const message = JSON.parse(buffer.data);
    const messageHandler = handlers.find((handler) => handler.message === message.event);
    if (!messageHandler) {
      return EMPTY;
    }
    return process(messageHandler.callback(message.data));
  }

  close(server: any) {
    server.close();
  }
}
