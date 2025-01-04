import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
  firstName: {
    type: String,
    default: '',
  },
  lastName: {
    type: String,
    default: '',
  },
  dateOfBirth: {
    type: Date,
    default: null,
  },
  role: {
    type: String,
    default: 'user',
  },
  status: {
    type: String,
    default: 'active',
  },
  gender: {
    type: String,
    default: 'male',
  },
  country: {
    type: String,
    default: 'Viet Nam',
  },
  crc32Hash: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
