import { CanActivate, Injectable } from '@nestjs/common';
import { extractWsUser } from '@packages/ws/utils/extract-ws-user';
import { Socket } from 'socket.io';

@Injectable()
export class WsAuthGuard implements CanActivate {
  async canActivate(context: any): Promise<boolean> {
    const socket: Socket = context.args[0];
    const token = extractWsUser(socket);

    if (!token) {
      return false;
    }

    try {
      const user = { id: 'test' };

      socket.data = { user };

      return !!user;
    } catch (ex) {
      return false;
    }
  }
}
