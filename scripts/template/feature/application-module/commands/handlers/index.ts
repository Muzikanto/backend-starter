import { Provider } from '@nestjs/common';
import { CreateFeatureCommandHandler } from './create-feature.handler';

export const CommandHandlers: Provider[] = [CreateFeatureCommandHandler];
