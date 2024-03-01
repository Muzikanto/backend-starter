import { ILeadDto } from '../../../domain';
import { IPaginatedResult } from '@packages/nest';

export type IGetLeadResponse = ILeadDto;

export type IFindLeadResponse = IPaginatedResult<ILeadDto>;
