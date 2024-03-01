import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import { Socket } from 'socket.io';
import { extractWsUser } from '@packages/ws/utils/extract-ws-user';

export const WsAuthUser = (opts: { nullable?: boolean } = {}) =>
  createParamDecorator((data: unknown, context: any): unknown => {
    const socket: Socket = context.args[0];
    const user = extractWsUser(socket);

    if (!user && !opts.nullable) {
      throw new UnauthorizedException('Not authorized');
    }

    return user;
  })();
