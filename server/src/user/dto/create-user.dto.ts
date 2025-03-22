import { IsEmail, IsEnum, isNotEmpty, IsNotEmpty, MinLength } from 'class-validator';
export class CreateUserDto {
  
  @IsNotEmpty()
  plan:'string';


  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  first_name:string;

  @IsNotEmpty()
  last_name:string;

  @IsNotEmpty()
  role:string;

  @IsNotEmpty()
  @MinLength(5)
  username: string;

  @IsNotEmpty()
  firmLawyer:boolean;


}
