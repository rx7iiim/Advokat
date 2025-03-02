import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
type AuthInput={email:string ; password:string};
type SinginData={user_Id:number ; firs_name:string }

@Injectable()
export class AuthService {
  /*  constructor(
        private readonly userservice:UserService
    ){}
    async validateuser(input :AuthInput):Promise<SinginData>{

        const user = await this.userservice.findUserByEmail(input.email);
        return user
    }*/
}
