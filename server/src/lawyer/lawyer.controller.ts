import { Controller, Get, Post, Body, Delete, Query, UploadedFile, MaxFileSizeValidator, FileTypeValidator, ParseFilePipe, UseInterceptors } from '@nestjs/common';
import { LawyerService } from './lawyer.service';
import { CreateLawyerDto } from './dto/create-lawyer.dto';
import { GoogleDriveService } from 'src/drive/drive.service';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('clients')
export class LawyerController {
  constructor(  
    private readonly lawyerService: LawyerService,
    private readonly googleDriveService:GoogleDriveService
  ) {}

@Post('lawyer')
@UseInterceptors(FileInterceptor('pfp'))
async create(
@Body() body:any,
@Query('username') username:string,
@UploadedFile(new ParseFilePipe({
  validators :[
    new MaxFileSizeValidator({maxSize:100000000}),
    new FileTypeValidator({fileType:'image/jpeg'}),
  ],
}),
) file :Express.Multer.File,
)
 {
  
  console.log(file);
  const folderId="1DGOYFqUIa_iSn52T_Ss0FktdQoMdbNnU"
  const uploadFile=await this.googleDriveService.uploadFile(file ,folderId);

    return this.lawyerService.createClient(body,username,uploadFile.id);
  }

  @Get("lawyers")
  findTasks(@Query ('username') username:string) {
    console.log( this.lawyerService.getuserClients(username));
    return (this.lawyerService.getuserClients(username));
  }


  @Delete()
  remove(@Query('id') id: number) {
    return this.lawyerService.deleteClient(id);
  }
}
