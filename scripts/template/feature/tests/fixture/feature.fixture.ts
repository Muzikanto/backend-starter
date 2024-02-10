import { Feature } from '../../domain';
import { FeatureEntity } from '../../db-adapter';

export function getFeatureFixture(): Feature {
  return new Feature(new FeatureEntity({}));
}
