import { ObjectId } from 'mongoose';

export class AuthModel extends Document {
  source: string;

  sourceId: ObjectId;

  type: string;

  value: string;

  key: string;

  salt: string;

  createdAt: Date;

  updatedAt: Date;
}
