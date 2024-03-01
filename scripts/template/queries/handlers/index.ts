import { Provider } from '@nestjs/common';
import { CreateFeatureCommandHandler } from './get-feature.handler';

export const CommandHandlers: Provider[] = [CreateFeatureCommandHandler];
