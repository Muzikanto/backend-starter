import { User } from '../../domain';
import { UserEntity } from '../../db-adapter';

export function getUserFixture(): User {
  return new User(new UserEntity({}));
}
