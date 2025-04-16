import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';

export class NotFoundCustomException extends BaseException {
  constructor(message = 'Recurso não encontrado') {
    super(message, HttpStatus.NOT_FOUND);
  }
}
