import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
  providers: [EmailService], 
  //controllers: [UserController], 
  exports: [EmailService], 
})
export class EmailModule {}
