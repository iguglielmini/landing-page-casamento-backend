import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeddingExpense } from '../wedding-expense/entities/wedding-expense.entity';
import { WeddingPayment } from './entities/wedding-payment.entity';
import { CreateWeddingPaymentDto } from './dto/create-wedding-payment.dto';

@Injectable()
export class WeddingPaymentService {
  constructor(
    @InjectRepository(WeddingPayment)
    private readonly paymentRepo: Repository<WeddingPayment>,

    @InjectRepository(WeddingExpense)
    private readonly expenseRepo: Repository<WeddingExpense>,
  ) {}

  async create(dto: CreateWeddingPaymentDto) {
    const expense = await this.expenseRepo.findOne({
      where: { id: dto.expenseId },
      relations: ['payments'],
    });

    if (!expense) {
      throw new NotFoundException('Despesa não encontrada');
    }

    const totalPaid =
      expense.payments?.reduce((sum, p) => sum + p.amount, 0) || 0;
    const newTotal = totalPaid + dto.amount;

    if (newTotal > expense.totalValue) {
      throw new BadRequestException('Valor pago excede o total da despesa');
    }

    const payment = this.paymentRepo.create({
      expense,
      amount: dto.amount,
    });

    await this.paymentRepo.save(payment);

    return {
      message: 'Pagamento registrado com sucesso',
      payment,
      saldoRestante: expense.totalValue - newTotal,
    };
  }

  async findAllByExpense(expenseId: number) {
    return this.paymentRepo.find({
      where: { expense: { id: expenseId } },
      order: { paidAt: 'DESC' },
    });
  }
}
