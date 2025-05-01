import { forwardRef, Module } from '@nestjs/common';
import { LawyerService } from './lawyer.service';
import { LawyerController } from './lawyer.controller';
import { DriveModule } from 'src/drive/drive.module';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LawFirm } from 'src/law-firm/entities/law-firm.entity';
import { LawFirmModule } from 'src/law-firm/law-firm.module';

@Module({
  imports:[forwardRef(()=>LawyerModule),TypeOrmModule.forFeature([User]),DriveModule,TypeOrmModule.forFeature([LawFirm]),LawFirmModule],  
  controllers: [LawyerController],
  providers: [LawyerService],
  exports:[LawyerService],
})
export class LawyerModule {}
