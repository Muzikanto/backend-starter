import { Body, Controller, Get, NotImplementedException, Post, Query, UsePipes } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ValidationPipe } from '@packages/nest';

const tag = 'Auth';

@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  })
)
@Controller({ path: '/auth', version: '1' })
export class AuthController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post('/')
  @ApiOperation({
    summary: 'Authenticate',
    tags: [tag],
  })
  @ApiResponse({ type: String })
  @ApiBearerAuth('authorization')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(): Promise<string> {
    throw new NotImplementedException();
  }
}
