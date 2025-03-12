import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { LawFirmModule } from './law-firm/law-firm.module';
import { LawyerModule } from './lawyer/lawyer.module';
import { FileModule } from './file/file.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ClientModule } from './client/client.module';
import { AuthModule} from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Subscription } from 'rxjs';
import { LawFirm } from './law-firm/entities/law-firm.entity';
import { Lawyer } from './lawyer/entities/lawyer.entity';
import { Client } from './client/entities/client.entity';
import { File } from './file/entities/file.entity';
import { Schedule } from './schedule/entities/schedule.entity';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './auth/guards/session.serializer';
import { SessionEntity } from './session/session.entity'



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    LawFirmModule,
    FileModule,
    LawyerModule,
    ScheduleModule,
    ClientModule,
    SubscriptionModule,
    UserModule,
    EmailModule, 
    DatabaseModule,
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([SessionEntity]),
  ],
  controllers: [AppController],
  providers: [AppService,SessionSerializer],})
export class AppModule {}












