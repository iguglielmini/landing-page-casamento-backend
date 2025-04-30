import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { WeddingExpense } from '../../wedding-expense/entities/wedding-expense.entity';

@Entity()
export class WeddingPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WeddingExpense, (expense) => expense.payments, {
    onDelete: 'CASCADE',
  })
  expense: WeddingExpense;

  @Column('float')
  amount: number;

  @CreateDateColumn()
  paidAt: Date;
}
