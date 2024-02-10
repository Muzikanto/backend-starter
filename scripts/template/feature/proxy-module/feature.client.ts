import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ClassExceptionFormatter, createTcpConfig } from '@packages/client-api';
import { ICreateFeaturePayload, ICreateFeatureResponse } from '../application-module/commands/types';
import { IGetFeaturePayload, IGetFeatureResponse } from '../application-module/queries/types';

export const FEATURE_CLIENT_MESSAGE = {
  create: 'feature.create',
  get: 'feature.get',
};

@ClassExceptionFormatter({ service: 'Feature' })
@Injectable()
export class FeatureClient {
  constructor(@Inject(createTcpConfig('GATEWAY')) protected readonly client: ClientProxy) {
    //
  }

  public async createFeature(query: ICreateFeaturePayload): Promise<ICreateFeatureResponse> {
    const result = await firstValueFrom(
      this.client.send<ICreateFeatureResponse, ICreateFeaturePayload>(FEATURE_CLIENT_MESSAGE.create, query)
    );

    return result;
  }

  public async getFeature(query: IGetFeaturePayload): Promise<IGetFeatureResponse> {
    const result = await firstValueFrom(
      this.client.send<IGetFeatureResponse, IGetFeaturePayload>(FEATURE_CLIENT_MESSAGE.get, query)
    );

    return result;
  }
}
