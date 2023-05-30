import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateOrdersDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  products: [];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  total: string;
}
