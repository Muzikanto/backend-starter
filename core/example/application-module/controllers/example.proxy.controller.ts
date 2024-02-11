import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExampleDto } from '@core/example/domain';
import { CreateExampleDto } from '@core/example/application-module/commands/dto/create-example.dto';
import { GetExampleDto } from '@core/example/application-module/queries/dto/get-example.dto';
import { ICreateExampleResponse } from '@core/example/application-module/commands/types/response.types';
import { IGetExampleResponse } from '@core/example/application-module/queries/types/response.types';
import { ExampleClient } from '@core/example/proxy-module';
import { AuthUser, IAuthUser } from '@core/auth/core';

const tag = 'Example';

@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  })
)
@Controller({ path: '/example', version: '1' })
export class ExampleProxyController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly client: ExampleClient
  ) {}

  @Get('/get')
  @ApiOperation({
    summary: 'Get example',
    tags: [tag],
  })
  @ApiResponse({ type: ExampleDto })
  @ApiBearerAuth('authorization')
  async get(@Query() query: GetExampleDto, @AuthUser() authUser: IAuthUser): Promise<IGetExampleResponse> {
    return this.client.getExample({ ...query });
  }

  @Post('/create')
  @ApiOperation({
    summary: 'Create example',
    tags: [tag],
  })
  @ApiResponse({ type: ExampleDto })
  @ApiBearerAuth('authorization')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(@Body() body: CreateExampleDto, @AuthUser() authUser: IAuthUser): Promise<ICreateExampleResponse> {
    return this.client.createExample({ ...body });
  }
}
