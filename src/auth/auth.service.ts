import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './types/jwt-payload.interface';
import { AuthenticatedUser } from './types/authenticated-user.interface';

import { BaseException } from '../common/exceptions/base.exception';
import { successResponse } from '../common/responses/success.response';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<AuthenticatedUser> {
    const user = await this.usersService.findByUsername(username);
    const isValid = user && (await bcrypt.compare(password, user.password));

    if (!isValid) {
      throw new BaseException('Usuário ou senha inválidos', 401);
    }

    return {
      id: user.id,
      username: user.username,
      role: user.role,
    };
  }

  login(user: AuthenticatedUser) {
    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    return successResponse('Login realizado com sucesso', {
      access_token: this.jwtService.sign(payload),
      user: {
        username: user.username,
        role: user.role,
      },
    });
  }
}
