import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ClassExceptionFormatter, createTcpConfig } from '@packages/client-api';
import { ICreateUserPayload, ICreateUserResponse } from '../application-module/commands/types';
import { IGetUserPayload, IGetUserResponse } from '../application-module/queries/types';

export const USER_CLIENT_MESSAGE = {
  create: 'user.create',
  get: 'user.get',
};

@ClassExceptionFormatter({ service: 'User' })
@Injectable()
export class UserClient {
  constructor(@Inject(createTcpConfig('GATEWAY')) protected readonly client: ClientProxy) {
    //
  }

  public async createUser(query: ICreateUserPayload): Promise<ICreateUserResponse> {
    const result = await firstValueFrom(
      this.client.send<ICreateUserResponse, ICreateUserPayload>(USER_CLIENT_MESSAGE.create, query)
    );

    return result;
  }

  public async getUser(query: IGetUserPayload): Promise<IGetUserResponse> {
    const result = await firstValueFrom(
      this.client.send<IGetUserResponse, IGetUserPayload>(USER_CLIENT_MESSAGE.get, query)
    );

    return result;
  }
}
