import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseTypeDto {
  @ApiProperty({ example: 'Buffet' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
