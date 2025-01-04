import {
  Body,
  Controller,
  forwardRef,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/services';
import { AuthService } from '../services';
import { RegisterPayload } from '../payloads';
import { AuthCreateDto } from '../dtos/auth.dto';
import { SOURCE_TYPE } from '../constans';
import { DataResponse } from 'src/kernel/models';

@Controller('auth')
export class UserRegisterController {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @Post('/user/register')
  @HttpCode(HttpStatus.OK)
  async registerUser(@Body() payload: RegisterPayload) {
    const user = await this.userService.register(payload);
    const auth = await this.authService.create(
      new AuthCreateDto({
        source: SOURCE_TYPE.USER,
        sourceId: user._id,
        type: 'email',
        value: payload.password,
        key: user.email,
      }),
    );
    const expiresIn = 60 * 60 * 24 * 30 * 6;
    const token = this.authService.generateJWT(auth, { expiresIn });
    return DataResponse.ok({
      message: 'Successfully registered',
      token,
    });
  }
}
