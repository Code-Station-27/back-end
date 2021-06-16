import { IsEmail, IsPhoneNumber, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsPhoneNumber()
  phone: string;

  @IsUUID()
  city: string;
}
