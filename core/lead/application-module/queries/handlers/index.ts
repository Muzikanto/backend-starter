import { Provider } from '@nestjs/common';
import { GetLeadHandler } from './get-lead.handler';
import { FindLeadQueryHandler } from './find-lead.handler';

export const QueryHandlers: Provider[] = [GetLeadHandler, FindLeadQueryHandler];
