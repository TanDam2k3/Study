import { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';

export const AuthSchema = new Schema({
  source: {
    type: String,
    default: '',
  },
  sourceId: {
    type: ObjectId,
  },
  type: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
  },
  key: {
    type: String,
    default: '',
  },
  salt: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});
