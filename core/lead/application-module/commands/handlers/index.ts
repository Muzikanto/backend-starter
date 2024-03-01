import { Provider } from '@nestjs/common';
import { CreateLeadCommandHandler } from './create-lead.handler';

export const CommandHandlers: Provider[] = [CreateLeadCommandHandler];
