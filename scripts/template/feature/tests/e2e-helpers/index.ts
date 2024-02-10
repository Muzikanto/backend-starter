import { ITestingApplication } from '@packages/testing/types';
import { IGetFeatureDto } from '../../application-module/queries/types';
import { IFeatureDto } from '../../domain';

export async function testingGetFeature(app: ITestingApplication, opts: { featureId: string }): Promise<IFeatureDto> {
  const result = await app.injectGet<IGetFeatureDto, IFeatureDto>({
    url: '/feature',
    args: { featureId: opts.featureId },
  });

  expect(result.status).toBe(200);

  return result.data;
}
