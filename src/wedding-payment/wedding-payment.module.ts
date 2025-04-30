import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeddingPaymentService } from './wedding-payment.service';
import { WeddingPaymentController } from './wedding-payment.controller';
import { WeddingPayment } from './entities/wedding-payment.entity';
import { WeddingExpense } from '../wedding-expense/entities/wedding-expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WeddingPayment, WeddingExpense])],
  controllers: [WeddingPaymentController],
  providers: [WeddingPaymentService],
})
export class WeddingPaymentModule {}
