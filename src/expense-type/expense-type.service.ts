import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenseType } from './entities/expense-type.entity';
import { CreateExpenseTypeDto } from './dto/create-expense-type.dto';
import { successResponse } from '../common/responses/success.response';
import { NotFoundCustomException } from '../common/exceptions/not-found.exception';

@Injectable()
export class ExpenseTypeService {
  constructor(
    @InjectRepository(ExpenseType)
    private readonly repo: Repository<ExpenseType>,
  ) {}

  async create(dto: CreateExpenseTypeDto) {
    const type = this.repo.create(dto);
    const saved = await this.repo.save(type);
    return successResponse('Tipo de despesa criado com sucesso', saved);
  }

  async findAll() {
    const list = await this.repo.find({ order: { createdAt: 'DESC' } });
    return successResponse('Lista de tipos de despesa', list);
  }

  async findOne(id: string) {
    const type = await this.repo.findOneBy({ id });
    if (!type) throw new NotFoundCustomException('Tipo não encontrado');
    return successResponse('Tipo de despesa encontrado', type);
  }

  async remove(id: string) {
    const exists = await this.repo.findOneBy({ id });
    if (!exists) throw new NotFoundCustomException('Tipo não encontrado');
    await this.repo.delete(id);
    return successResponse('Tipo de despesa removido com sucesso');
  }
}
