import { Provider } from '@nestjs/common';
import { CreateUserCommandHandler } from './create-user.handler';

export const CommandHandlers: Provider[] = [CreateUserCommandHandler];
