import { LeadEntity } from '../../db-adapter';
import { ILeadDto } from '../types/lead.dto.types';
import { Lead } from '../aggregates/lead.aggregate';

export class LeadMapper {
  public static toPersistence(domain: Lead): LeadEntity {
    return domain.entity;
  }

  public static toDomain(entity: LeadEntity): Lead {
    return new Lead(entity);
  }

  public static toResponse({ entity: { createdAt, ...other } }: Lead): ILeadDto {
    return {
      ...other,
      createdAt: createdAt.getTime(),
    };
  }
}
