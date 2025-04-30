import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ExpenseType } from '../../expense-type/entities/expense-type.entity';
import { WeddingPayment } from '../../wedding-payment/entities/wedding-payment.entity';

@Entity()
export class WeddingExpense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  description: string;

  @ManyToOne(() => ExpenseType, { eager: true })
  type: ExpenseType;

  @Column('float')
  totalValue: number;

  @Column('float')
  paidValue: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => WeddingPayment, (payment) => payment.expense)
  payments: WeddingPayment[];
}
