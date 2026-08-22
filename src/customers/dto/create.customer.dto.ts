import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name!: string; 

  @IsString()
  @IsPhoneNumber()
  phone!: string;
}
