import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from '../user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }

  serializeUser(user: any, done: (err: Error | null, userId: any) => void): void {
    console.log('Serializing user:', user.userId); // Debugging
    done(null, user.userId); // Store the user ID in the session
}

 // Attach the user object to `request.user`
 async deserializeUser(userId: number, done: (err: Error | null, user: any) => void): Promise<void> {
  console.log('Deserializing user:', userId); // Debugging

  try {
      const user = await this.userService.findOneById(userId); // Fetch user from the database
      done(null, user); // Attach the user object to `request.user`
  } catch (error) {
      done(error as Error, null); // Pass the error to Passport
  }
}
}