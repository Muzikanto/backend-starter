import { UserEntity } from '../../db-adapter';
import { IUserDto } from '../types/user.dto.types';
import { User } from '../aggregates/user.aggregate';

export class UserMapper {
  public static toPersistence(domain: User): UserEntity {
    return domain.entity;
  }

  public static toDomain(entity: UserEntity): User {
    return new User(entity);
  }

  public static toResponse({ entity: { createdAt, ...other } }: User): IUserDto {
    return {
      ...other,
      createdAt: createdAt.getTime(),
    };
  }
}
