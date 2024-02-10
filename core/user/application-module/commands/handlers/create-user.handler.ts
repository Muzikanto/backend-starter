import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/create-user.command';
import { User } from '../../../domain';
import { UserRepository } from '../../../infrastructure-module';
import { UserEntity } from '../../../db-adapter';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  constructor(protected readonly userRepository: UserRepository) {
    //
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute({ payload }: CreateUserCommand): Promise<User> {
    const user = this.userRepository.toDomain(new UserEntity({}));

    // save
    await this.userRepository.save(user);

    // commit
    user.commit();

    return user;
  }
}
