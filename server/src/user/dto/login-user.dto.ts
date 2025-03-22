import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
export class loginUserDto {
  @ValidateIf(o => !o.username)
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @ValidateIf(o => !o.email)
  @IsString({ message: 'Username must be a string' })
  username?: string;

  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;
}
