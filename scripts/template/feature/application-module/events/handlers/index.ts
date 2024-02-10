import { Provider } from '@nestjs/common';

import { FeatureCreatedHandler } from './feature-created.handler';

export const EventHandlers: Provider[] = [FeatureCreatedHandler];
