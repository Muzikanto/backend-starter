export function mockRmqConfig() {
  process.env.RABBITMQ_HOST = 'test';
  process.env.RABBITMQ_PORT = '1';
  process.env.RABBITMQ_USER = 'test';
  process.env.RABBITMQ_PASSWORD = 'test';
  process.env.RABBITMQ_WORKER_QUEUE = 'test';
  process.env.RABBITMQ_GAME_SERVER_QUEUE = 'test';
  process.env.RABBITMQ_GATEWAY_QUEUE = 'test';
}

export function mockTcpConfig(key: string) {
  process.env[`TCP_${key}_HOST`] = 'test';
  process.env[`TCP_${key}_PORT`] = '1';
}
