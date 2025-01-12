import * as mongoose from 'mongoose';

export const MONGO_DB_PROVIDER = 'MONGO_DB_PROVIDER';

export const mongoDBProviders = [
  {
    provide: MONGO_DB_PROVIDER,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONGO_URI, {}),
  },
];
