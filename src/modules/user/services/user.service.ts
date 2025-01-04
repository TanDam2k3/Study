import { Inject, Injectable } from '@nestjs/common';
import { USER_MODEL_PROVIDER } from '../providers';
import { Model } from 'mongoose';
import { UserModel } from '../models';
import { RegisterPayload } from 'src/modules/auth/payloads';
import { UserCreateDto } from '../dtos';
import {
  EntityNotFoundException,
  ForbiddenException,
} from 'src/kernel/exceptions';
import { ROLE, STATUS } from '../constans';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_MODEL_PROVIDER)
    private readonly userModel: Model<UserModel>,
  ) {}

  async findOne(username: string) {
    const data = await this.userModel.findOne({ userName: username });
    return data;
  }

  async register(payload: RegisterPayload): Promise<UserCreateDto> {
    if (!payload && !payload.username && !payload.email)
      throw new EntityNotFoundException();

    const existUser = await this.userModel.findOne({
      userName: payload.username,
    });
    if (existUser) throw new ForbiddenException();
    const user = await this.userModel.create({
      ...payload,
      userName: payload.username,
      status: STATUS.ACTIVE,
      role: ROLE.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return user;
  }
}
