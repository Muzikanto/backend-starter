import { TestingModuleBuilder } from '@nestjs/testing';
import { SENTRY_TOKEN } from '@ntegral/nestjs-sentry';
import { getMockSentry } from './getMockSentry';

export function withMockSentry(app: TestingModuleBuilder): TestingModuleBuilder {
  return app.overrideProvider(SENTRY_TOKEN).useValue(getMockSentry());
}
