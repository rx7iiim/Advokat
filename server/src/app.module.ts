import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { User } from './user/entities/user.entity';
import { Lawyer } from './lawyer/entities/lawyer.entity';
import { Subscription } from './subscription/entities/subscription.entity';
import { LawFirmModule } from './law-firm/law-firm.module';
import { LawyerModule } from './lawyer/lawyer.module';
import { FileModule } from './file/file.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ClientModule } from './client/client.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.DATABASE_URL, 
    entities:[User,Lawyer,Subscription],
    synchronize: true, 
  }), UserModule, SubscriptionModule, LawFirmModule, LawyerModule, FileModule, ScheduleModule, ClientModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
