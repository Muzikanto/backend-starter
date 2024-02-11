import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const Roles = <T extends string = string>(...roles: T[]): CustomDecorator => SetMetadata('roles', roles);
