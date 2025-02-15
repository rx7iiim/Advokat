import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LawyersModule } from './lawyers/lawyers.module';
import { CaseModule } from './case/case.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { User } from './user/entities/user.entity';
import { Case } from './case/entities/case.entity';
import { Lawyer } from './lawyers/entities/lawyer.entity';
import { Subscription } from './subscription/entities/subscription.entity';
import { ManagerModule } from './manager/manager.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [LawyersModule, CaseModule, TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.DATABASE_URL, 
    entities:[Case,User,Lawyer,Subscription],
    synchronize: true, 
  }), UserModule, SubscriptionModule, ManagerModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
