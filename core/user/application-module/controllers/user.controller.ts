import { Controller, Get, UsePipes } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ValidationPipe } from '@packages/nest';
import { UserDto } from '../../domain';
import { IGetUserResponse } from '../queries/types';
import { GetUserQuery } from '@core/user/application-module/queries/impl';
import { AuthUser, IAuthUser } from '@core/auth/core';

const tag = 'User';

@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  })
)
@Controller({ path: '/user', version: '1' })
export class UserController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get('/')
  @ApiOperation({
    summary: 'Get user',
    tags: [tag],
  })
  @ApiResponse({ type: UserDto })
  @ApiBearerAuth('authorization')
  async get(@AuthUser() authUser: IAuthUser): Promise<IGetUserResponse> {
    return this.queryBus.execute(new GetUserQuery({ id: authUser.id }));
  }
}
