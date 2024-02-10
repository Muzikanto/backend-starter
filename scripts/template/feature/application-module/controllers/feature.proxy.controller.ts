import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthenticatedUser } from 'nest-keycloak-connect';
import { FeatureDto } from '../../domain';
import { GetFeatureDto } from '../queries/dto/get-feature.dto';
import { IGetFeatureResponse } from '../queries/types';
import { ICreateFeatureResponse } from '../commands/types';
import { CreateFeatureDto } from '../commands/dto';
import { FeatureClient } from '../../proxy-module';

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
  @ApiOperation({
    summary: 'Get feature',
    tags: [tag],
  })
  @ApiResponse({ type: FeatureDto })
  @ApiBearerAuth('authorization')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(@Query() query: GetFeatureDto, @AuthenticatedUser() userAuth: any): Promise<IGetFeatureResponse> {
    return this.client.getFeature({ ...query });
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
    return this.client.createFeature({ ...body });
  }
}
