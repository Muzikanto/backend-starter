import { NestFastifyApplication } from '@nestjs/platform-fastify';

// eslint-disable-next-line
export type ITestingApplicationMethodRes<Res = void> = { status: number; data: Res };
export type ITestingApplicationUtils = {
  // eslint-disable-next-line
  injectPost: <Args extends object | undefined, Res = void>(opts: {
    url: string;
    args?: Args;
    token?: string;
    isMultipart?: boolean;
    handleError?: boolean;
  }) => Promise<ITestingApplicationMethodRes<Res>>;
  injectGet: <Args extends object | undefined, Res = void>(opts: {
    url: string;
    args?: Args;
    token?: string;
    handleError?: boolean;
  }) => Promise<ITestingApplicationMethodRes<Res>>;
  stop: () => Promise<void>;
};
export type ITestingApplication = NestFastifyApplication & ITestingApplicationUtils;
