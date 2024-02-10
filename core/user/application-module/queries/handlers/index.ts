import { Provider } from '@nestjs/common';
import { GetUserHandler } from './get-user.handler';

export const QueryHandlers: Provider[] = [GetUserHandler];
