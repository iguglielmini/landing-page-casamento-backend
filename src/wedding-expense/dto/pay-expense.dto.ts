import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PayExpenseDto {
  @ApiProperty({ example: 500 })
  @IsNumber()
  @Min(1)
  amount: number;
}
