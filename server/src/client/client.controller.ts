import { Controller, Get, Post, Body, Delete, Query, UploadedFile, MaxFileSizeValidator, FileTypeValidator, ParseFilePipe, UseInterceptors } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { GoogleDriveService } from 'src/drive/drive.service';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('clients')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly googleDriveService:GoogleDriveService
  ) {}

@Post('client')
@UseInterceptors(FileInterceptor('pfp'))
async create(
@Body() body:any,
@Query('username') username:string,
@UploadedFile(new ParseFilePipe({
  validators :[
    new MaxFileSizeValidator({maxSize:1000000}),
    new FileTypeValidator({fileType:'image/jpeg'}),
  ],
}),
) file :Express.Multer.File,
)
 {
  
  console.log(file);
  const folderId="1DGOYFqUIa_iSn52T_Ss0FktdQoMdbNnU"
  const uploadFile=await this.googleDriveService.uploadFile(file ,folderId)

    return this.clientService.createClient(body,username,uploadFile.id);
  }

  @Get("clients")
  findTasks(@Query ('username') username:string) {
    console.log( this.clientService.getuserClients(username));
    return (this.clientService.getuserClients(username));
  }


  @Delete()
  remove(@Query('id') id: number) {
    return this.clientService.deleteClient(id);
  }
}
