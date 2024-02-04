import { Provider } from '@nestjs/common';
import { GetExampleHandler } from '@core/example/application-module/queries/handlers/get-example.handler';

export const QueryHandlers: Provider[] = [GetExampleHandler];
