import { Controller, Get, UsePipes } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthenticatedUser } from 'nest-keycloak-connect';

import { ValidationPipe } from '@packages/nest';
import { UserDto } from '../../domain';
import { IGetUserResponse } from '../queries/types';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(@AuthenticatedUser() user: any): Promise<IGetUserResponse> {
    return user;
  }
}