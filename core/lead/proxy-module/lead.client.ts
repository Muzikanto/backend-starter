import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ClassExceptionFormatter, createTcpConfig } from '@packages/client-api';
import { ICreateLeadPayload, ICreateLeadResponse } from '../application-module/commands/types';
import {
  IFindLeadPayload,
  IFindLeadResponse,
  IGetLeadPayload,
  IGetLeadResponse,
} from '../application-module/queries/types';

export const LEAD_CLIENT_MESSAGE = {
  create: 'lead.create',
  get: 'lead.get',
  find: 'lead.find',
};

@ClassExceptionFormatter({ service: 'Lead' })
@Injectable()
export class LeadClient {
  constructor(@Inject(createTcpConfig('GATEWAY')) protected readonly client: ClientProxy) {
    //
  }

  public async createLead(query: ICreateLeadPayload): Promise<ICreateLeadResponse> {
    const result = await firstValueFrom(
      this.client.send<ICreateLeadResponse, ICreateLeadPayload>(LEAD_CLIENT_MESSAGE.create, query)
    );

    return result;
  }

  public async getLead(query: IGetLeadPayload): Promise<IGetLeadResponse> {
    const result = await firstValueFrom(
      this.client.send<IGetLeadResponse, IGetLeadPayload>(LEAD_CLIENT_MESSAGE.get, query)
    );

    return result;
  }

  public async findLeads(query: IFindLeadPayload): Promise<IFindLeadResponse> {
    const result = await firstValueFrom(
      this.client.send<IFindLeadResponse, IFindLeadPayload>(LEAD_CLIENT_MESSAGE.find, query)
    );

    return result;
  }
}
