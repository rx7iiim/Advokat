import { IsString, IsEnum, IsOptional } from 'class-validator';




export class UpdateUserDto {
  @IsString()
  plan: string;

  @IsString()
  lawFirm: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  username: string;

  @IsString()
  role: string;

  @IsString()
  phoneNumber:string ;

}
