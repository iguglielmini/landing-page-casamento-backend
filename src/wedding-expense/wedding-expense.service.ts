import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeddingExpense } from './entities/wedding-expense.entity';
import { CreateWeddingExpenseDto } from './dto/create-wedding-expense.dto';
import { UpdateWeddingExpenseDto } from './dto/update-wedding-expense.dto';
import { PayExpenseDto } from './dto/pay-expense.dto';
import { successResponse } from '../common/responses/success.response';
import { NotFoundCustomException } from '../common/exceptions/not-found.exception';
import { ExpenseType } from '../expense-type/entities/expense-type.entity';

@Injectable()
export class WeddingExpenseService {
  constructor(
    @InjectRepository(WeddingExpense)
    private readonly repo: Repository<WeddingExpense>,
  ) {}

  async create(dto: CreateWeddingExpenseDto) {
    const expense = this.repo.create({
      ...dto,
      type: { id: dto.type } as Pick<ExpenseType, 'id'>,
    });

    const saved = await this.repo.save(expense);
    return successResponse('Despesa criada com sucesso', saved);
  }

  async findAll() {
    const all = await this.repo.find({
      order: { date: 'DESC' },
      relations: ['type'],
    });

    const result = all.map((expense) => ({
      ...expense,
      saldo: expense.totalValue - expense.paidValue,
    }));

    return successResponse('Lista de despesas', result);
  }

  async findOne(id: number) {
    const expense = await this.repo.findOne({
      where: { id },
      relations: ['type'],
    });

    if (!expense) {
      throw new NotFoundCustomException('Despesa não encontrada');
    }

    return successResponse('Despesa encontrada', {
      ...expense,
      saldo: expense.totalValue - expense.paidValue,
    });
  }

  async update(id: number, dto: UpdateWeddingExpenseDto) {
    const exists = await this.repo.findOneBy({ id });
    if (!exists) throw new NotFoundCustomException('Despesa não encontrada');

    await this.repo.update(id, {
      ...dto,
      type: dto.type
        ? ({ id: dto.type } as Pick<ExpenseType, 'id'>)
        : undefined,
    });

    const updated = await this.repo.findOne({
      where: { id },
      relations: ['type'],
    });

    return successResponse('Despesa atualizada com sucesso', updated);
  }

  async remove(id: number) {
    const exists = await this.repo.findOneBy({ id });
    if (!exists) throw new NotFoundCustomException('Despesa não encontrada');

    await this.repo.delete(id);
    return successResponse('Despesa removida com sucesso');
  }

  async getSummaryByType() {
    const all = await this.repo.find({ relations: ['type'] });

    const grouped = all.reduce(
      (acc, item) => {
        const typeName = item.type?.name ?? 'Outro';

        if (!acc[typeName]) {
          acc[typeName] = {
            type: typeName,
            total: 0,
            paid: 0,
            saldo: 0,
          };
        }

        acc[typeName].total += item.totalValue;
        acc[typeName].paid += item.paidValue;
        acc[typeName].saldo = acc[typeName].total - acc[typeName].paid;

        return acc;
      },
      {} as Record<
        string,
        { type: string; total: number; paid: number; saldo: number }
      >,
    );

    return successResponse('Resumo de gastos por tipo', Object.values(grouped));
  }

  async pay(id: number, dto: PayExpenseDto) {
    const expense = await this.repo.findOneBy({ id });
    if (!expense) {
      throw new NotFoundCustomException('Despesa não encontrada');
    }

    const newPaidValue = expense.paidValue + dto.amount;

    if (newPaidValue > expense.totalValue) {
      throw new Error('O valor pago excede o valor total da despesa');
    }

    expense.paidValue = newPaidValue;
    await this.repo.save(expense);

    return successResponse('Pagamento registrado com sucesso', {
      ...expense,
      saldo: expense.totalValue - expense.paidValue,
    });
  }
}
