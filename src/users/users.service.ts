import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

import { successResponse } from '../common/responses/success.response';
import { NotFoundCustomException } from '../common/exceptions/not-found.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const saved = await this.userRepository.save(user);

    return successResponse('Usuário criado com sucesso', {
      id: saved.id,
      username: saved.username,
      role: saved.role,
      createdAt: saved.createdAt,
    });
  }

  async findAll() {
    const users = await this.userRepository.find({
      select: ['id', 'username', 'role', 'createdAt'],
    });

    return successResponse('Lista de usuários', users);
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async findById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundCustomException('Usuário não encontrado');
    }

    return successResponse('Usuário encontrado', {
      id: user.id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
    });
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundCustomException('Usuário não encontrado');
    }

    await this.userRepository.delete(id);

    return successResponse('Usuário removido com sucesso');
  }
}
