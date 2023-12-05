// import mongoose from "mongoose";

jest.setTimeout(20_000);

beforeAll(async () => {
  // put your client connection code here, example with mongoose:
  // await mongoose.connect(process.env['MONGO_URI'] as string);
  // eslint-disable-next-line
  // const mongoUri: string = process.env['MONGO_URI'] as string;
  // await mongoose.connect(mongoUri);
});

afterAll(async () => {
  // put your client disconnection code here, example with mongodb:
  // await mongoose.disconnect();
});
