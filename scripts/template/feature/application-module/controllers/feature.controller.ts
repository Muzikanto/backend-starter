import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthenticatedUser } from 'nest-keycloak-connect';

import { GetFeatureQuery } from '../queries/impl';
import { ValidationPipe } from '@packages/nest';
import { GetFeatureDto } from '../queries/dto/get-feature.dto';
import { Feature, FeatureDto, FeatureMapper } from '../../domain';
import { IGetFeatureResponse } from '../queries/types';
import { CreateFeatureDto } from '../commands/dto';
import { ICreateFeatureResponse } from '../commands/types';
import { CreateFeatureCommand } from '../commands/impl';

const tag = 'Feature';

@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  })
)
@Controller({ path: '/feature', version: '1' })
export class FeatureController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get('/get')
  @ApiOperation({
    summary: 'Get feature',
    tags: [tag],
  })
  @ApiResponse({ type: FeatureDto })
  @ApiBearerAuth('authorization')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(@Query() query: GetFeatureDto, @AuthenticatedUser() userAuth: any): Promise<IGetFeatureResponse> {
    const feature = await this.queryBus.execute<GetFeatureQuery, Feature>(new GetFeatureQuery({ id: query.featureId }));

    return FeatureMapper.toResponse(feature);
  }

  @Post('/create')
  @ApiOperation({
    summary: 'Create feature',
    tags: [tag],
  })
  @ApiResponse({ type: FeatureDto })
  @ApiBearerAuth('authorization')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(@Body() body: CreateFeatureDto, @AuthenticatedUser() userAuth: any): Promise<ICreateFeatureResponse> {
    const feature = await this.commandBus.execute<CreateFeatureCommand, Feature>(
      new CreateFeatureCommand({ value: body.value })
    );

    return FeatureMapper.toResponse(feature);
  }
}
