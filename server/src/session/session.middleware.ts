import { Injectable, NestMiddleware } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    session({
      name:"advocat.sid",
      secret: 'idk what is this used for tbh',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 hour
    })(req, res, next);
  }
}