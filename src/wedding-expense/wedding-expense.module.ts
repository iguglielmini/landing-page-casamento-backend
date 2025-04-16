import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeddingExpense } from './entities/wedding-expense.entity';
import { WeddingExpenseService } from './wedding-expense.service';
import { WeddingExpenseController } from './wedding-expense.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WeddingExpense])],
  controllers: [WeddingExpenseController],
  providers: [WeddingExpenseService],
})
export class WeddingExpenseModule {}
