import {
  Body,
  Controller,
  forwardRef,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { AuthService } from '../services';
import { UserService } from 'src/modules/user/services';
import { LoginPayload } from '../payloads';
import { DataResponse } from 'src/kernel/models';
import { STATUS } from '../constans';
import { PasswordIncorrectException } from '../exceptions';
import moment from 'moment';

@Controller('auth')
export class LoginController {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(
    @Body() req: LoginPayload,
  ): Promise<DataResponse<{ token: string }>> {
    const query = req.username.toLocaleLowerCase();
    const user = await this.userService.findOne(query);
    if (!user) {
      throw new HttpException(
        'This account does not exist, please sign up',
        404,
      );
    }
    if (user && user.status === STATUS.DELETED) {
      throw new HttpException(
        'This account does not exist, please sign up',
        404,
      );
    }
    if (user && user.status === STATUS.INACTIVE) {
      throw new HttpException(
        'This account does not exist, please sign up',
        404,
      );
    }
    const authUser = await this.authService.findBySource({
      source: 'user',
      sourceId: user._id.toString(),
    });

    if (!authUser) {
      throw new HttpException(
        'This account does not exist, please sign up',
        404,
      );
    }
    if (authUser && !this.authService.verifyPassword(req.password, authUser)) {
      throw new PasswordIncorrectException();
    }
    let token = null;
    const expiresIn = 60 * 60 * 24 * 30 * 6;

    if (authUser) {
      token = this.authService.generateJWT(authUser, { expiresIn });
    }
    const expiredAt = moment().add(expiresIn, 'seconds');
    return DataResponse.ok({ token, expiredAt });
  }
}
