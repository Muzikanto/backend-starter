import {Body, Controller, Get, Post, Query, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FeatureDto } from '../../domain';
import { GetFeatureDto } from '../queries/dto/get-feature.dto';
import { IGetFeatureResponse } from '../queries/types';
import { ICreateFeatureResponse } from '../commands/types';
import { CreateFeatureDto } from '../commands/dto';
import { FeatureClient } from '../../proxy-module';
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
export class FeatureProxyController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly client: FeatureClient
  ) {}

  @Get('/get')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get feature',
    tags: [tag],
  })
  @ApiResponse({ type: FeatureDto })
  @ApiBearerAuth('authorization')
  async get(@Query() query: GetFeatureDto, @AuthUser() authUser: IAuthUser): Promise<IGetFeatureResponse> {
    return this.client.getFeature({ ...query });
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
    return this.client.createFeature({ ...body });
  }
}
