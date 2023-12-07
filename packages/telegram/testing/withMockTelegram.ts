import { TestingModuleBuilder } from '@nestjs/testing';
import { getBotToken } from 'nestjs-telegraf';
import { getMockTelegrafBot } from '@packages/telegram/testing/getMockTelegrafBot';

export function withMockTelegram(app: TestingModuleBuilder): TestingModuleBuilder {
  return app.overrideProvider(getBotToken()).useValue(getMockTelegrafBot());
}
