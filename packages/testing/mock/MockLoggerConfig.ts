import { Injectable } from '@nestjs/common';

@Injectable()
class MockLoggerConfig {
  createLoggerOptions(): any {
    return {
      level: 'error',
    };
  }
}

export default MockLoggerConfig;
