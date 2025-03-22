import { forwardRef, Module } from '@nestjs/common';
import { LawFirmService } from './law-firm.service';
import { LawFirmController } from './law-firm.controller';
import { LawFirm } from './entities/law-firm.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from 'src/email/email.module';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports:[TypeOrmModule.forFeature([LawFirm]),EmailModule,forwardRef(() =>AuthModule )],
  controllers: [LawFirmController],
  providers: [LawFirmService],
   exports:[LawFirmService],
})
export class LawFirmModule {}
