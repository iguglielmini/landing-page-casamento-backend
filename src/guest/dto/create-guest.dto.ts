import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateGuestDto {
  @ApiProperty({ example: 'João' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Silva' })
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty({ example: '+5511987654321' })
  @IsPhoneNumber('BR')
  phone: string;

  @ApiProperty({ enum: ['Noivo', 'Noiva', 'Ambos'] })
  @IsEnum(['Noivo', 'Noiva', 'Ambos'])
  invitedBy: 'Noivo' | 'Noiva' | 'Ambos';

  @ApiProperty({ example: true })
  @IsBoolean()
  hasCompanion: boolean;

  @ApiProperty({ enum: ['Amigos', 'Padrinhos', 'Familiar'] })
  @IsEnum(['Amigos', 'Padrinhos', 'Familiar'])
  type: 'Amigos' | 'Padrinhos' | 'Familiar';
}
