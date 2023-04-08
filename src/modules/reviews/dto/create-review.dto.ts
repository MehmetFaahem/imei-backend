import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  quality: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}
