import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFavouriteDto {
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
  category: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  indication: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  pharmacology: string;
}
