import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';

import { UserType } from '.prisma/client';

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

  @IsOptional()
  @IsString()
  type: UserType;

  @IsString()
  street: string;

  @IsString()
  number: string;

  @IsString()
  district: string;
}
