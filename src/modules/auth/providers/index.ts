import { Connection } from 'mongoose';
import { AuthSchema } from '../schemas/auth.schema';
import { MONGO_DB_PROVIDER } from 'src/kernel/infras/mongodb';

export const AUTH_MODEL_PROVIDER = 'AUTH_MODEL';

export const authProviders = [
  {
    provide: AUTH_MODEL_PROVIDER,
    useFactory: (connection: Connection) =>
      connection.model('Auth', AuthSchema),
    inject: [MONGO_DB_PROVIDER],
  },
];
