import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User} from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { EmailModule } from 'src/email/email.module';
import { LocalStrategy } from './strategies/local.strategy';
import { LawFirmModule } from 'src/law-firm/law-firm.module';
import { LawFirm } from 'src/law-firm/entities/law-firm.entity';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './guards/session.serializer';
import { UserService } from 'src/user/user.service';


@Module({
  imports: [forwardRef(() =>UserModule ),forwardRef(() =>LawFirmModule ),EmailModule,TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([LawFirm]),PassportModule.register({ session: true })],
  providers: [AuthService, LocalStrategy, SessionSerializer, UserService],
  controllers: [AuthController],
  exports:[AuthService],
})
export class AuthModule {}
