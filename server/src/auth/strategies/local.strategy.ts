import { Strategy as LocalStrategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(LocalStrategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username', // Field name for the username in the request body
      passwordField: 'password', // Field name for the password in the request body
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user; // This will be passed to `serializeUser`
  }
}