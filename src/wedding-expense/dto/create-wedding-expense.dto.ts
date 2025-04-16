import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDateString,
  IsUUID,
} from 'class-validator';

export class CreateWeddingExpenseDto {
  @ApiProperty()
  @IsDateString()
  date: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  type: string;

  @ApiProperty()
  @IsNumber()
  totalValue: number;

  @ApiProperty()
  @IsNumber()
  paidValue: number;
}
