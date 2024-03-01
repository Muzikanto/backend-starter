import { Lead } from '../../domain';
import { LeadEntity } from '../../db-adapter';

export function getLeadFixture(): Lead {
  return new Lead(new LeadEntity({ name: 'maxim', message: 'hello world', email: 'maxim@outluk.com' }));
}
