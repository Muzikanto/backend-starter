import { Provider } from '@nestjs/common';
import { GetFeatureHandler } from './get-feature.handler';

export const QueryHandlers: Provider[] = [GetFeatureHandler];
