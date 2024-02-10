import { FeatureEntity } from '../../db-adapter';
import { IFeatureDto } from '../types/feature.dto.types';
import { Feature } from '../aggregates/feature.aggregate';

export class FeatureMapper {
  public static toPersistence(domain: Feature): FeatureEntity {
    return domain.entity;
  }

  public static toDomain(entity: FeatureEntity): Feature {
    return new Feature(entity);
  }

  public static toResponse({ entity: { createdAt, ...other } }: Feature): IFeatureDto {
    return {
      ...other,
      createdAt: createdAt.getTime(),
    };
  }
}
