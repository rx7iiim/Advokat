import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from '../subscription/entities/subscription.entity';
import { Client } from 'src/client/entities/client.entity';
import { File } from 'src/file/entities/file.entity';
import { LawFirm } from 'src/law-firm/entities/law-firm.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { SessionEntity } from 'src/session/session.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) =>({
            type: 'postgres',
            url: configService.get<string>('DATABASE_URL'),
            entities:[User,Subscription,LawFirm,Client,File,Schedule,SessionEntity],
            autoLoadEntities: true,
            synchronize: true,
        }),}),
  ],
})
export class DatabaseModule {}
