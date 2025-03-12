import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {

    constructor(private readonly userService:UserService){super()}
  serializeUser(user: User, done: (err: any, id?: any) => void) {
    done(null, user.userId);
  }

  async deserializeUser(id: number, done: (err: any, user?: any) => void) {
    const user = await this.userService.findOne(id);
    done(null, user);
  }
}