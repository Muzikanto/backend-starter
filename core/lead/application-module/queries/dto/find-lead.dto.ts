import { IFindLeadDto, IGetLeadDto } from '../types/dto.types';
import { PaginatedQueryDto, TransformID } from '@packages/nest';

export class FindLeadDto extends PaginatedQueryDto implements IFindLeadDto {}
