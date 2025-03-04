import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { User } from './user/entities/user.entity';
import { Lawyer } from './lawyer/entities/lawyer.entity';
import { Client } from './client/entities/client.entity';
import { LawFirm } from './law-firm/entities/law-firm.entity';
import { Schedule } from './schedule/entities/schedule.entity';
import { Subscription } from './subscription/entities/subscription.entity';
import { LawFirmModule } from './law-firm/law-firm.module';
import { LawyerModule } from './lawyer/lawyer.module';
import { FileModule } from './file/file.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ClientModule } from './client/client.module';
import { AuthModule} from './auth/auth.module';
import { File } from './file/entities/file.entity';
import * as dotenv from 'dotenv';
import { EmailModule } from './email/email.module';
dotenv.config();


@Module({
  imports: [
    AuthModule,
    LawFirmModule,
    FileModule,
    LawyerModule,
    ScheduleModule,
    ClientModule,
    SubscriptionModule,
    UserModule,
    EmailModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, 
      synchronize: true, 
      entities:[User,Subscription,LawFirm,Lawyer,Client,File,Schedule]
    }),
    TypeOrmModule.forFeature([User, Subscription, LawFirm, Lawyer, Client, File, Schedule]),
  ],
  controllers: [AppController],
  providers: [AppService],})
export class AppModule {}












