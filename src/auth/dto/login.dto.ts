import { IsNotEmpty, IsPhoneNumber, IsString, MinLength } from "class-validator";


export class LoginDto{
@IsPhoneNumber('UZ')
  @IsNotEmpty()
  phone: string;

  @IsString()
  @MinLength(6)
  password: string;
}