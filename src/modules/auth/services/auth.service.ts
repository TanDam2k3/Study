import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { Inject, Injectable } from '@nestjs/common';
import { AUTH_MODEL_PROVIDER } from '../providers';
import { Model, ObjectId } from 'mongoose';
import { AuthModel } from '../models';
import { AuthCreateDto } from '../dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_MODEL_PROVIDER)
    private readonly authModel: Model<AuthModel>,
  ) {}
  public generateSalt(byteSize = 16): string {
    return crypto.randomBytes(byteSize).toString('base64');
  }

  public encryptPassword(pw: string, salt: string): string {
    // Số lần lặp của thuật toán PBKDF2
    const defaultIterations = 10000;
    //  Độ dài của kết quả mã hóa
    const defaultKeyLength = 64;

    return crypto
      .pbkdf2Sync(pw, salt, defaultIterations, defaultKeyLength, 'sha1')
      .toString('base64');
  }

  public generateJWT(auth: any, options: any = {}): string {
    const newOptions = {
      expiresIn: 60 * 60 * 24 * 30,
      ...(options || {}),
    };
    return jwt.sign(
      {
        authId: auth._id,
        source: auth.source,
        sourceId: auth.sourceId,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: newOptions.expiresIn,
      },
    );
  }

  public async create(data: AuthCreateDto): Promise<AuthModel> {
    const salt = this.generateSalt();
    let newVal = data.value;
    if (['email', 'username'].includes(data.type) && newVal) {
      newVal = this.encryptPassword(newVal, salt);
    }
    const auth = await this.authModel.findOneAndUpdate(
      {
        type: data.type,
        source: data.source,
        sourceId: data.sourceId,
      },
      {
        $set: {
          salt: salt,
          value: newVal,
          key: data.key,
        },
      },
      {
        new: true,
        upsert: true,
      },
    );

    return auth || null;
  }

  public async findBySource(options: {
    source?: string;
    sourceId?: ObjectId | string;
    type?: string;
    key?: string;
  }): Promise<AuthModel | null> {
    return this.authModel.findOne(options);
  }

  public verifyPassword(pw: string, auth: AuthModel): boolean {
    if (!pw || !auth || !auth.salt) {
      return false;
    }
    return this.encryptPassword(pw, auth.salt) === auth.value;
  }
}
