import { Example } from '@core/example/domain';
import { ExampleEntity } from '@core/example/db-adapter';

export function getExampleFixture(): Example {
  return new Example(new ExampleEntity({}));
}
