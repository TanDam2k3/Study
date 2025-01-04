import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';

export class UserDto {
  _id?: Types.ObjectId;

  userName?: string;

  email?: string;

  firstName?: string;

  lastName?: string;

  dateOfBirth?: Date;

  role?: string;

  status?: string;

  gender?: string;

  country?: string;

  crc32Hash?: string;

  __v: number;

  createdAt?: Date;

  updatedAt?: Date;
}

export class UserCreateDto {
  _id?: ObjectId;

  userName?: string;

  email?: string;

  firstName?: string;

  lastName?: string;

  dateOfBirth?: Date;

  role?: string;

  status?: string;

  gender?: string;

  country?: string;

  crc32Hash?: string;

  createdAt?: Date;

  updatedAt?: Date;

  constructor(data: Partial<UserCreateDto>) {
    this.userName = data.userName;
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.dateOfBirth = data.dateOfBirth;
    this.role = data.role;
    this.status = data.status;
    this.gender = data.gender;
    this.country = data.country;
    this.crc32Hash = data.crc32Hash;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export class UserUpdateDto extends UserCreateDto {}
