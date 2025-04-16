import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseTypeService } from './expense-type.service';
import { ExpenseTypeController } from './expense-type.controller';
import { ExpenseType } from './entities/expense-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseType])],
  controllers: [ExpenseTypeController],
  providers: [ExpenseTypeService],
  exports: [ExpenseTypeService],
})
export class ExpenseTypeModule {}
