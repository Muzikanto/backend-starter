import { Socket } from 'socket.io';

export function extractWsUser<T = any>(socket: Socket): T | null {
  const user = socket.data?.user || null;

  return user;
}
