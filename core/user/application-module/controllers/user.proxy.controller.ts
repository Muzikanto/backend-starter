import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserDto } from '../../domain';
import { GetUserDto } from '../queries/dto/get-user.dto';
import { IGetUserResponse } from '../queries/types';
import { ICreateUserResponse } from '../commands/types';
import { CreateUserDto } from '../commands/dto';
import { UserClient } from '../../proxy-module';
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
export class UserProxyController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly client: UserClient
  ) {}

  @Get('/get')
  @ApiOperation({
    summary: 'Get user',
    tags: [tag],
  })
  @ApiResponse({ type: UserDto })
  @ApiBearerAuth('authorization')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(@Query() query: GetUserDto, @AuthUser() authUser: IAuthUser): Promise<IGetUserResponse> {
    return this.client.getUser({ ...query });
  }

  @Post('/create')
  @ApiOperation({
    summary: 'Create user',
    tags: [tag],
  })
  @ApiResponse({ type: UserDto })
  @ApiBearerAuth('authorization')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(@Body() body: CreateUserDto, @AuthUser() authUser: IAuthUser): Promise<ICreateUserResponse> {
    return this.client.createUser({ ...body });
  }
}
