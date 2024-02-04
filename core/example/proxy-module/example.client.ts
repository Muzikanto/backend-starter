import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ICreateExamplePayload } from '@core/example/application-module/commands/types/payload.types';
import { ICreateExampleResponse } from '@core/example/application-module/commands/types/response.types';
import { IGetExampleResponse } from '@core/example/application-module/queries/types/response.types';
import { IGetExamplePayload } from '@core/example/application-module/queries/types/payload.types';
import { ClassExceptionFormatter, createTcpConfig } from '@packages/client-api';

export const EXAMPLE_CLIENT_MESSAGE = {
  create: 'example.create',
  get: 'example.get',
};

@ClassExceptionFormatter({ service: 'Example' })
@Injectable()
export class ExampleClient {
  constructor(@Inject(createTcpConfig('GATEWAY')) protected readonly client: ClientProxy) {
    //
  }

  public async createExample(query: ICreateExamplePayload): Promise<ICreateExampleResponse> {
    const result = await firstValueFrom(
      this.client.send<ICreateExampleResponse, ICreateExamplePayload>(EXAMPLE_CLIENT_MESSAGE.create, query)
    );

    return result;
  }

  public async getExample(query: IGetExamplePayload): Promise<IGetExampleResponse> {
    const result = await firstValueFrom(
      this.client.send<IGetExampleResponse, IGetExamplePayload>(EXAMPLE_CLIENT_MESSAGE.get, query)
    );

    return result;
  }
}
