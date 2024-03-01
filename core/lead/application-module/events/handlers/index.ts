import { Provider } from '@nestjs/common';

import { LeadCreatedHandler } from './lead-created.handler';

export const EventHandlers: Provider[] = [LeadCreatedHandler];
