import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class Pagination {
  @IsOptional()
  @IsPositive()
  @IsNumber()
  page = 1;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  limit = 10;
}
