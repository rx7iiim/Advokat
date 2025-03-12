import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

export class CreateLawFirmDto {
      @IsEmail()
      email: string;
    
      @IsNotEmpty()
      @MinLength(6)
      password: string;
    
      @IsNotEmpty()
      @MinLength(5)
      LawFirmName: string;



      @IsNotEmpty()
      phoneNumber:number;


      @IsNotEmpty()
      @MinLength(9)
      address:string;
      
      @IsNotEmpty()
      EmployeesNumber:number;    
    }
    
