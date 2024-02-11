import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Example, ExampleMapper, ExampleDto } from '@core/example/domain';
import { CreateExampleCommand } from '@core/example/application-module/commands/impl';
import { CreateExampleDto } from '@core/example/application-module/commands/dto/create-example.dto';
import { GetExampleDto } from '@core/example/application-module/queries/dto/get-example.dto';
import { ICreateExampleResponse } from '@core/example/application-module/commands/types/response.types';
import { IGetExampleResponse } from '@core/example/application-module/queries/types/response.types';

import { GetExampleQuery } from '../queries/impl';
import { ValidationPipe } from '@packages/nest';
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
export class ExampleController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get('/get')
  @ApiOperation({
    summary: 'Get example',
    tags: [tag],
  })
  @ApiResponse({ type: ExampleDto })
  @ApiBearerAuth('authorization')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(@Query() query: GetExampleDto, @AuthUser() authUser: IAuthUser): Promise<IGetExampleResponse> {
    const example = await this.queryBus.execute<GetExampleQuery, Example>(new GetExampleQuery({ id: query.exampleId }));

    return ExampleMapper.toResponse(example);
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
    const example = await this.commandBus.execute<CreateExampleCommand, Example>(
      new CreateExampleCommand({ value: body.value })
    );

    return ExampleMapper.toResponse(example);
  }
}
