import { Socket } from 'socket.io';

export function extractWsToken(socket: Socket): string | undefined {
  const token =
    socket.handshake.headers.authorization?.split(' ').pop() || (socket.handshake.query.ak as string | undefined);

  return token;
}
