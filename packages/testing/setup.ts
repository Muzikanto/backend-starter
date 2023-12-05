// eslint-disable-next-line
// import { MongoMemoryServer } from 'mongodb-memory-server';

export = async function globalSetup(): Promise<void> {
  // const mongoMemoryServer = await MongoMemoryServer.create();
  // const mongoUri = mongoMemoryServer.getUri();
  //
  // eslint-disable-next-line
  // (global as any).__MONGO_URI = mongoUri;
  // eslint-disable-next-line
  // (global as any).__MONGO_INSTANCE = mongoMemoryServer;
  //
  // process.env.MONGO_URI = mongoUri;
};
