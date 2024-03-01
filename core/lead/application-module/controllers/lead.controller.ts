import { Body, Controller, Get, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { FindLeadQuery, GetLeadQuery } from '../queries/impl';
import { IPaginatedResult, ValidationPipe } from '@packages/nest';
import { GetLeadDto } from '../queries/dto/get-lead.dto';
import { Lead, LeadDto, LeadMapper, LeadsDto } from '../../domain';
import { IFindLeadResponse, IGetLeadResponse } from '../queries/types';
import { CreateLeadDto } from '../commands/dto';
import { ICreateLeadResponse } from '../commands/types';
import { CreateLeadCommand } from '../commands/impl';
import { AuthGuard, AuthUser, IAuthUser, RoleGuard, Roles } from '@core/auth/core';
import { FindLeadDto } from '@core/lead/application-module/queries/dto/find-lead.dto';

const tag = 'Lead';

@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  })
)
@Controller({ path: '/lead', version: '1' })
export class LeadController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

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
    const lead = await this.queryBus.execute<GetLeadQuery, Lead>(new GetLeadQuery({ id: query.leadId }));

    return LeadMapper.toResponse(lead);
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
    const { rows, count } = await this.queryBus.execute<FindLeadQuery, IPaginatedResult<Lead>>(
      new FindLeadQuery({ limit: query.limit, offset: query.offset })
    );

    return {
      rows: rows.map((row) => LeadMapper.toResponse(row)),
      count,
    };
  }

  @Post('/create')
  @ApiOperation({
    summary: 'Create lead',
    tags: [tag],
  })
  @ApiResponse({ type: LeadDto })
  async create(@Body() body: CreateLeadDto): Promise<ICreateLeadResponse> {
    const lead = await this.commandBus.execute<CreateLeadCommand, Lead>(
      new CreateLeadCommand({ email: body.email, name: body.name, message: body.message })
    );

    return LeadMapper.toResponse(lead);
  }
}
