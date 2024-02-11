import {Body, Controller, Get, Post, Query, UseGuards, UsePipes} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { GetFeatureQuery } from '../queries/impl';
import { ValidationPipe } from '@packages/nest';
import { GetFeatureDto } from '../queries/dto/get-feature.dto';
import { Feature, FeatureDto, FeatureMapper } from '../../domain';
import { IGetFeatureResponse } from '../queries/types';
import { CreateFeatureDto } from '../commands/dto';
import { ICreateFeatureResponse } from '../commands/types';
import { CreateFeatureCommand } from '../commands/impl';
import {AuthGuard, AuthUser, IAuthUser} from "@core/auth/core";

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
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get feature',
    tags: [tag],
  })
  @ApiResponse({ type: FeatureDto })
  @ApiBearerAuth('authorization')
  async get(@Query() query: GetFeatureDto, @AuthUser() authUser: IAuthUser): Promise<IGetFeatureResponse> {
    const feature = await this.queryBus.execute<GetFeatureQuery, Feature>(new GetFeatureQuery({ id: query.featureId }));

    return FeatureMapper.toResponse(feature);
  }

  @Post('/create')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create feature',
    tags: [tag],
  })
  @ApiResponse({ type: FeatureDto })
  @ApiBearerAuth('authorization')
  async create(@Body() body: CreateFeatureDto, @AuthUser() authUser: IAuthUser): Promise<ICreateFeatureResponse> {
    const feature = await this.commandBus.execute<CreateFeatureCommand, Feature>(
      new CreateFeatureCommand({ value: body.value })
    );

    return FeatureMapper.toResponse(feature);
  }
}
