import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { IRequest } from '@core/auth/core';

export const AuthUser = (opts: { nullable?: boolean } = {}) =>
  createParamDecorator((data: unknown, ctx: ExecutionContext): unknown => {
    const request = ctx.switchToHttp().getRequest<IRequest>();

    if (!request.user && !opts.nullable) {
      throw new UnauthorizedException('Not authorized');
    }

    return request.user;
  })();
