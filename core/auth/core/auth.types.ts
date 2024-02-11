import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { FastifyRequest } from 'fastify';

export type IAuthUser = { id: string; roles?: string[] };
export type IRequest = FastifyRequest & { user?: IAuthUser };

export type ICreateUserAuthTokenOptions = JwtOptionsFactory;

export interface IAuthModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<ICreateUserAuthTokenOptions>;
  useClass?: Type<ICreateUserAuthTokenOptions>;
  useFactory?: (...args: any[]) => Promise<JwtModuleOptions> | JwtModuleOptions;
  inject?: any[];
}
