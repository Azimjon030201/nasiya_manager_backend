import { IsString, IsNotEmpty, IsPhoneNumber, IsOptional } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string; 

  @IsString()
  @IsNotEmpty()
  lastName!: string; 

  @IsPhoneNumber()
  @IsNotEmpty()
  phone!: string; 

  @IsString()
  @IsOptional()
  photo?: string; 

  @IsString()
  @IsOptional()
  address?: string; 

  @IsString()
  @IsOptional()
  note?: string; 
}
