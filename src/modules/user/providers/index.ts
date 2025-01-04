import { Connection } from 'mongoose';
import { MONGO_DB_PROVIDER } from 'src/kernel/infras/mongodb';
import { userSchema } from '../schemas';

export const USER_MODEL_PROVIDER = 'USER_MODEL';

export const userProviders = [
  {
    provide: USER_MODEL_PROVIDER,
    useFactory: (connection: Connection) =>
      connection.model('User', userSchema),
    inject: [MONGO_DB_PROVIDER],
  },
];
