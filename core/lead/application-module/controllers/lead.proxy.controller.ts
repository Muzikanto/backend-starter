import { Body, Controller, Get, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Lead, LeadDto, LeadMapper, LeadsDto } from '../../domain';
import { GetLeadDto } from '../queries/dto/get-lead.dto';
import { IFindLeadResponse, IGetLeadResponse } from '../queries/types';
import { ICreateLeadResponse } from '../commands/types';
import { CreateLeadDto } from '../commands/dto';
import { LeadClient } from '../../proxy-module';
import { AuthGuard, AuthUser, IAuthUser, RoleGuard, Roles } from '@core/auth/core';
import { FindLeadDto } from '@core/lead/application-module/queries/dto/find-lead.dto';
import { FindLeadQuery } from '@core/lead/application-module/queries/impl';
import { IPaginatedResult } from '@packages/nest';

const tag = 'Lead';

@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  })
)
@Controller({ path: '/lead', version: '1' })
export class LeadProxyController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly client: LeadClient
  ) {}

  @Get('/get')
  @Roles('admin')
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({
    summary: 'Get lead',
    tags: [tag],
  })
  @ApiResponse({ type: LeadDto })
  @ApiBearerAuth('authorization')
  async get(@Query() query: GetLeadDto, @AuthUser() authUser: IAuthUser): Promise<IGetLeadResponse> {
    return this.client.getLead({ ...query });
  }

  @Get('/')
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({
    summary: 'Find leads',
    tags: [tag],
  })
  @ApiResponse({ type: LeadsDto })
  @ApiBearerAuth('authorization')
  async find(@Query() query: FindLeadDto, @AuthUser() authUser: IAuthUser): Promise<IFindLeadResponse> {
    return this.client.findLeads(query);
  }

  @Post('/create')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create lead',
    tags: [tag],
  })
  @ApiResponse({ type: LeadDto })
  @ApiBearerAuth('authorization')
  async create(@Body() body: CreateLeadDto, @AuthUser() authUser: IAuthUser): Promise<ICreateLeadResponse> {
    return this.client.createLead({ ...body });
  }
}
