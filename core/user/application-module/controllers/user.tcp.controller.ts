import { Controller, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { USER_CLIENT_MESSAGE } from '../../proxy-module/user.client';

import { GetUserQuery } from '../queries/impl';
import { IGetUserPayload, IGetUserResponse } from '../queries/types';
import { User, UserMapper } from '../../domain';
import { ICreateUserPayload, ICreateUserResponse } from '../commands/types';
import { CreateUserCommand } from '../commands/impl';

@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  })
)
@Controller({ path: '/user', version: '1' })
export class UserTcpController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @MessagePattern(USER_CLIENT_MESSAGE.get, Transport.TCP)
  async get(@Query() payload: IGetUserPayload): Promise<IGetUserResponse> {
    const user = await this.queryBus.execute<GetUserQuery, User>(new GetUserQuery({ id: payload.userId }));

    return UserMapper.toResponse(user);
  }

  @MessagePattern(USER_CLIENT_MESSAGE.create, Transport.TCP)
  async create(@Payload() payload: ICreateUserPayload): Promise<ICreateUserResponse> {
    const user = await this.commandBus.execute<CreateUserCommand, User>(
      new CreateUserCommand({ value: payload.value })
    );

    return UserMapper.toResponse(user);
  }
}
