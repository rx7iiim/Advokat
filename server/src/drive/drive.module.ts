import { Module } from '@nestjs/common';
import { GoogleDriveService } from './drive.service';
@Module({
  providers: [GoogleDriveService], 
  exports: [GoogleDriveService], 
})
export class DriveModule {}