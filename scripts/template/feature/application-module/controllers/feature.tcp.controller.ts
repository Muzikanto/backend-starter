import { Controller, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { FEATURE_CLIENT_MESSAGE } from '../../proxy-module/feature.client';

import { GetFeatureQuery } from '../queries/impl';
import { IGetFeaturePayload, IGetFeatureResponse } from '../queries/types';
import { Feature, FeatureMapper } from '../../domain';
import { ICreateFeaturePayload, ICreateFeatureResponse } from '../commands/types';
import { CreateFeatureCommand } from '../commands/impl';

@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  })
)
@Controller({ path: '/feature', version: '1' })
export class FeatureTcpController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @MessagePattern(FEATURE_CLIENT_MESSAGE.get, Transport.TCP)
  async get(@Query() payload: IGetFeaturePayload): Promise<IGetFeatureResponse> {
    const feature = await this.queryBus.execute<GetFeatureQuery, Feature>(
      new GetFeatureQuery({ id: payload.featureId })
    );

    return FeatureMapper.toResponse(feature);
  }

  @MessagePattern(FEATURE_CLIENT_MESSAGE.create, Transport.TCP)
  async create(@Payload() payload: ICreateFeaturePayload): Promise<ICreateFeatureResponse> {
    const feature = await this.commandBus.execute<CreateFeatureCommand, Feature>(
      new CreateFeatureCommand({ value: payload.value })
    );

    return FeatureMapper.toResponse(feature);
  }
}
