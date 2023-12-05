// eslint-disable-next-line
import { Injectable } from '@nestjs/common';

const state: any = {};

@Injectable()
export class MockRedis {
  async set(id: string, data: string): Promise<void> {
    state[id] = data;
  }

  async get(id: string): Promise<string | null> {
    const str = state[id];

    if (!str) {
      return null;
    }

    return str;
  }

  async del(id: string) {
    delete state[id];
  }
}
