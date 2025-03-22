
import { DataSource } from 'typeorm';
import { Subscription } from 'rxjs';
import { Client } from 'src/client/entities/client.entity';
import { File } from 'src/file/entities/file.entity';
import { LawFirm } from 'src/law-firm/entities/law-firm.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { User } from 'src/user/entities/user.entity';
import * as dotenv from 'dotenv';
dotenv.config();
export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User,Schedule,Client,File,LawFirm,Subscription],
  synchronize: true, 
});
