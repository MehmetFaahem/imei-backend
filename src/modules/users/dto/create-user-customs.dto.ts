import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCustomsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  product_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  company_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  power: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  additional: string;
}
