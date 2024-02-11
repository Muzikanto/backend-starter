import { Body, Controller, Get, NotImplementedException, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ValidationPipe } from '@packages/nest';
import { JwtService } from '@nestjs/jwt';
import { AuthConfig, AuthGuard, AuthUser, IAuthUser } from '@core/auth/core';
import { LoginDto } from '@core/auth/application-module/dto';

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
  constructor(protected readonly jwtService: JwtService, protected readonly authConfig: AuthConfig) {}

  @Post('/')
  @ApiOperation({
    summary: 'Authenticate',
    tags: [tag],
  })
  @ApiResponse({ type: String })
  async login(@Body() body: LoginDto): Promise<string> {
    // console.log(this.jwtService.sign({ id: 'test' }, { secret: this.authConfig.secret }));
    throw new NotImplementedException();
  }

  @Get('/')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Decode token',
    tags: [tag],
  })
  @ApiResponse({ type: Object })
  @ApiBearerAuth('authorization')
  async current(@AuthUser() authUser: IAuthUser): Promise<IAuthUser> {
    return authUser;
  }
}
