import { IExampleDto } from '@core/example/domain';
import { IGetExampleDto } from '@core/example/application-module/queries/types/dto.types';
import { ITestingApplication } from '@packages/testing/types';

export async function testingGetExample(app: ITestingApplication, opts: { exampleId: string }): Promise<IExampleDto> {
  const result = await app.injectGet<IGetExampleDto, IExampleDto>({
    url: '/example',
    args: { exampleId: opts.exampleId },
  });

  expect(result.status).toBe(200);

  return result.data;
}
