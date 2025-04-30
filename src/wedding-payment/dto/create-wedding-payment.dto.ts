import { IsNumber, Min, IsInt } from 'class-validator';

export class CreateWeddingPaymentDto {
  @IsInt()
  expenseId: number;

  @IsNumber()
  @Min(0.01)
  amount: number;
}
