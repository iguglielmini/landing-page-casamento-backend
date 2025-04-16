import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString, IsBoolean } from 'class-validator';

export class ConfirmGuestDto {
  @ApiProperty({ example: '+5511987654321' })
  @IsPhoneNumber('BR')
  phone: string;

  @ApiProperty({ example: 'João' })
  @IsString()
  name: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  hasCompanion: boolean;
}
