import { Provider } from '@nestjs/common';
import { CreateExampleCommandHandler } from '@core/example/application-module/commands/handlers/create-example.handler';

export const CommandHandlers: Provider[] = [CreateExampleCommandHandler];
