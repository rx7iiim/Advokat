import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { LawFirmModule } from './law-firm/law-firm.module';
import { FileModule } from './file/file.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ClientModule } from './client/client.module';
import { AuthModule} from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './auth/session.serializer';
import { TaskModule } from './task/task.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    LawFirmModule,
    FileModule,
    ScheduleModule,
    ClientModule,
    SubscriptionModule,
    UserModule,
    EmailModule, 
    DatabaseModule,
    PassportModule.register({ session: true }),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService,SessionSerializer],})
export class AppModule {}












