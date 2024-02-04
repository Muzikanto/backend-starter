import { Controller, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Example, ExampleMapper } from '@core/example/domain';
import { CreateExampleCommand } from '@core/example/application-module/commands/impl';
import { ICreateExampleResponse } from '@core/example/application-module/commands/types/response.types';
import { IGetExampleResponse } from '@core/example/application-module/queries/types/response.types';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { EXAMPLE_CLIENT_MESSAGE } from '@core/example/proxy-module';
import { ICreateExamplePayload } from '@core/example/application-module/commands/types/payload.types';
import { IGetExamplePayload } from '@core/example/application-module/queries/types/payload.types';

import { GetExampleQuery } from '../queries/impl';

@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  })
)
@Controller({ path: '/example', version: '1' })
export class ExampleTcpController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @MessagePattern(EXAMPLE_CLIENT_MESSAGE.get, Transport.TCP)
  async get(@Query() payload: IGetExamplePayload): Promise<IGetExampleResponse> {
    const example = await this.queryBus.execute<GetExampleQuery, Example>(
      new GetExampleQuery({ id: payload.exampleId })
    );

    return ExampleMapper.toResponse(example);
  }

  @MessagePattern(EXAMPLE_CLIENT_MESSAGE.create, Transport.TCP)
  async create(@Payload() payload: ICreateExamplePayload): Promise<ICreateExampleResponse> {
    const example = await this.commandBus.execute<CreateExampleCommand, Example>(
      new CreateExampleCommand({ value: payload.value })
    );

    return ExampleMapper.toResponse(example);
  }
}
