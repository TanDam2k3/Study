export class UserModel extends Document {
  userName: string;

  email: string;

  firstName: string;

  lastName: string;

  dateOfBirth: Date;

  role: string;

  status: string;

  gender: string;

  country: string;

  crc32Hash: string;

  createdAt: Date;

  updatedAt: Date;
}
