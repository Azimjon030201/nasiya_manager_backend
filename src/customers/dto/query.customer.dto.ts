import { IsOptional, IsString, IsEnum } from 'class-validator';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class QueryCustomerDto {
  @IsOptional()
  @IsString()
  search?: string; 

  @IsOptional()
  @IsEnum(SortOrder)
  sortByDebt?: SortOrder; 
}