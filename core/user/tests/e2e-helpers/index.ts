import { ITestingApplication } from '@packages/testing/types';
import { IGetUserDto } from '../../application-module/queries/types';
import { IUserDto } from '../../domain';

export async function testingGetUser(app: ITestingApplication, opts: { userId: string }): Promise<IUserDto> {
  const result = await app.injectGet<IGetUserDto, IUserDto>({
    url: '/user',
    args: { userId: opts.userId },
  });

  expect(result.status).toBe(200);

  return result.data;
}
