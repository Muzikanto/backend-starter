import { Provider } from '@nestjs/common';

import { ExampleCreatedHandler } from './example-created.handler';

export const EventHandlers: Provider[] = [ExampleCreatedHandler];
