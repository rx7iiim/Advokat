import { forwardRef, Module } from '@nestjs/common';
import { LawyerService } from './lawyer.service';
import { LawyerController } from './lawyer.controller';
import { DriveModule } from 'src/drive/drive.module';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LawFirm } from 'src/law-firm/entities/law-firm.entity';
import { LawFirmModule } from 'src/law-firm/law-firm.module';
import { Lawyer } from './entities/lawyer.entity';
import { UserModule } from 'src/user/user.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports:[TypeOrmModule.forFeature([Lawyer]),TypeOrmModule.forFeature([User]),DriveModule,forwardRef(() =>UserModule ),forwardRef(() =>EmailModule ),],  
  controllers: [LawyerController],
  providers: [LawyerService],
  exports:[LawyerService],
})
export class LawyerModule {}
