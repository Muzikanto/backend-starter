import { FastifyRequest } from 'fastify';

export function extractAuthToken(req: FastifyRequest): string | undefined {
  let token = req.headers?.authorization;

  if (!token) {
    const cookie = req.headers.cookie?.split('; ').find((el) => el.startsWith('authorization'));

    if (cookie) {
      token = cookie.split('=')[1];
    }
  }

  return token;
}
