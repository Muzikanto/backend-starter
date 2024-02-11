import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const AuthToken = createParamDecorator((_data: unknown, ctx: ExecutionContext): string => {
  const request: { token?: string } = ctx.switchToHttp().getRequest();
  const token = request.token;

  if (!token) {
    throw new UnauthorizedException('Not found auth token');
  }

  return token;
});
