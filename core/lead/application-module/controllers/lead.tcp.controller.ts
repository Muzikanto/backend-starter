import { Controller, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { LEAD_CLIENT_MESSAGE } from '../../proxy-module/lead.client';

import { FindLeadQuery, GetLeadQuery } from '../queries/impl';
import { IFindLeadPayload, IFindLeadResponse, IGetLeadPayload, IGetLeadResponse } from '../queries/types';
import { Lead, LeadMapper } from '../../domain';
import { ICreateLeadPayload, ICreateLeadResponse } from '../commands/types';
import { CreateLeadCommand } from '../commands/impl';
import { IPaginatedResult } from '@packages/nest';

@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  })
)
@Controller({ path: '/lead', version: '1' })
export class LeadTcpController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @MessagePattern(LEAD_CLIENT_MESSAGE.get, Transport.TCP)
  async get(@Query() payload: IGetLeadPayload): Promise<IGetLeadResponse> {
    const lead = await this.queryBus.execute<GetLeadQuery, Lead>(new GetLeadQuery({ id: payload.leadId }));

    return LeadMapper.toResponse(lead);
  }

  @MessagePattern(LEAD_CLIENT_MESSAGE.find, Transport.TCP)
  async find(@Payload() payload: IFindLeadPayload): Promise<IFindLeadResponse> {
    const { rows, count } = await this.queryBus.execute<FindLeadQuery, IPaginatedResult<Lead>>(
      new FindLeadQuery({ limit: payload.limit, offset: payload.offset })
    );

    return {
      rows: rows.map((row) => LeadMapper.toResponse(row)),
      count,
    };
  }

  @MessagePattern(LEAD_CLIENT_MESSAGE.create, Transport.TCP)
  async create(@Payload() payload: ICreateLeadPayload): Promise<ICreateLeadResponse> {
    const lead = await this.commandBus.execute<CreateLeadCommand, Lead>(
      new CreateLeadCommand({ email: payload.email, name: payload.name, message: payload.message })
    );

    return LeadMapper.toResponse(lead);
  }
}
