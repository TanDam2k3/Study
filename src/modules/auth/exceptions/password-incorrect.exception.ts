import { HttpException } from '@nestjs/common';
import { PASSWORD_INCORRECT } from '../constans';

export class PasswordIncorrectException extends HttpException {
  constructor() {
    super(PASSWORD_INCORRECT, 422);
  }
}
