import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User} from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { EmailModule } from 'src/email/email.module';


@Module({
  imports: [forwardRef(() =>UserModule ),EmailModule,TypeOrmModule.forFeature([User])],
  providers: [AuthService],
  controllers: [AuthController],
  exports:[AuthService],
})
export class AuthModule {}
