import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IAuthUser, IRequest } from '@core/auth/core';

@Injectable()
export class RoleGuard implements CanActivate {
  private reflector: Reflector;

  constructor(reflector: Reflector) {
    this.reflector = reflector;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    // eslint-disable-next-line
    const request = context.switchToHttp().getRequest<IRequest>();
    const userAuth: IAuthUser | undefined = request.user;

    if (!userAuth?.roles) {
      return false;
    }

    return this.matchRoles(roles, userAuth.roles);
  }

  protected matchRoles(checkRoles: string[], userRoles: string[]): boolean {
    return checkRoles.some((role) => userRoles.includes(role));
  }
}
