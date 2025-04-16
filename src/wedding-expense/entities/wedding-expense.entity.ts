import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ExpenseType } from '../../expense-type/entities/expense-type.entity';

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
}
