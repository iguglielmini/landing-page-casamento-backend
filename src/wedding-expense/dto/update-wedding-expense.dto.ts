import { PartialType } from '@nestjs/swagger';
import { CreateWeddingExpenseDto } from './create-wedding-expense.dto';

export class UpdateWeddingExpenseDto extends PartialType(
  CreateWeddingExpenseDto,
) {}
