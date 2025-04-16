import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(message: string, status = HttpStatus.BAD_REQUEST) {
    super({ status: 'error', message }, status);
  }
}
