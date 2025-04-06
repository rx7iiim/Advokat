import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";
export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format" })
  phoneNumber: string;

  @IsOptional()
  @IsString()
  contactInfo?: string;

}
