import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthenticatedUser } from 'nest-keycloak-connect';

import { GetUserQuery } from '../queries/impl';
import { ValidationPipe } from '@packages/nest';
import { GetUserDto } from '../queries/dto/get-user.dto';
import { User, UserDto, UserMapper } from '../../domain';
import { IGetUserResponse } from '../queries/types';
import { CreateUserDto } from '../commands/dto';
import { ICreateUserResponse } from '../commands/types';
import { CreateUserCommand } from '../commands/impl';

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

  @Get('/get')
  @ApiOperation({
    summary: 'Get user',
    tags: [tag],
  })
  @ApiResponse({ type: UserDto })
  @ApiBearerAuth('authorization')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(@Query() query: GetUserDto, @AuthenticatedUser() userAuth: any): Promise<IGetUserResponse> {
    const user = await this.queryBus.execute<GetUserQuery, User>(new GetUserQuery({ id: query.userId }));

    return UserMapper.toResponse(user);
  }

  @Post('/create')
  @ApiOperation({
    summary: 'Create user',
    tags: [tag],
  })
  @ApiResponse({ type: UserDto })
  @ApiBearerAuth('authorization')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(@Body() body: CreateUserDto, @AuthenticatedUser() userAuth: any): Promise<ICreateUserResponse> {
    const user = await this.commandBus.execute<CreateUserCommand, User>(new CreateUserCommand({ value: body.value }));

    return UserMapper.toResponse(user);
  }
}
