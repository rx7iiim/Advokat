import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { UserModule } from 'src/user/user.module';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { LawFirmModule } from 'src/law-firm/law-firm.module';
import { FileModule } from 'src/file/file.module';
import { ScheduleModulee } from 'src/schedule/schedule.module';
import { ClientModule } from 'src/client/client.module';
import { AuthModule} from 'src/auth/auth.module';
import { EmailModule } from 'src/email/email.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from 'src/auth/session.serializer';
import { TaskModule } from 'src/task/task.module';
import { DriveModule } from './drive/drive.module';
import { LawyerModule } from './lawyer/lawyer.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    LawFirmModule,
    FileModule,
    ScheduleModulee,
    ClientModule,
    SubscriptionModule,
    UserModule,
    EmailModule, 
    DatabaseModule,
    PassportModule.register({ session: true }),
    TaskModule,
    DriveModule,
    LawyerModule
 
  ],
  controllers: [AppController],
  providers: [AppService,SessionSerializer],})
export class AppModule {}












