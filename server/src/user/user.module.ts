import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmailModule } from '../email/email.module';
import { AuthModule } from 'src/auth/auth.module';
import { SessionEntity } from './entities/session.entity';

@Module({
  imports: [EmailModule ,forwardRef(() => AuthModule),TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService],
})
export class UserModule {}
