import { ITestingApplication } from '@packages/testing/types';
import { IGetLeadDto } from '../../application-module/queries/types';
import { ILeadDto } from '../../domain';

export async function testingGetLead(app: ITestingApplication, opts: { leadId: string }): Promise<ILeadDto> {
  const result = await app.injectGet<IGetLeadDto, ILeadDto>({
    url: '/lead',
    args: { leadId: opts.leadId },
  });

  expect(result.status).toBe(200);

  return result.data;
}
