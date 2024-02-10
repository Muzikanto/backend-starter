import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetUserQuery } from '../impl';
import { UserRepository } from '../../../infrastructure-module';
import { User } from '../../../domain';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(protected readonly userRepository: UserRepository) {}

  async execute({ payload }: GetUserQuery): Promise<User> {
    return this.userRepository.getUnwrap(payload.id);
  }
}
