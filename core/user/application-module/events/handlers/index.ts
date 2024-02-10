import { Provider } from '@nestjs/common';

import { UserCreatedHandler } from './user-created.handler';

export const EventHandlers: Provider[] = [UserCreatedHandler];
