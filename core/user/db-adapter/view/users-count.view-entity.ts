import { ViewColumn, ViewEntity } from 'typeorm';

import { IUsersCountViewEntity } from '@core/user/domain/types/user-analytics.types';
import { UserEntity } from '@core/user/db-adapter/user.entity';

@ViewEntity({ expression: (d) => d.getRepository(UserEntity).createQueryBuilder().select(['count(*)']) })
export class UsersCountViewEntity implements IUsersCountViewEntity {
  @ViewColumn()
  count = 0;
}
