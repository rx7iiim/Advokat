import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  first_name:String;

  @IsNotEmpty()
  last_name:String;

  @IsNotEmpty()
  @MinLength(5)
  username: string;

  


}
