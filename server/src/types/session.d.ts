import { SessionData } from 'express-session';
declare module 'express-session' {
  interface SessionData {
    passport?: { user: any };
  }
}

declare module 'express' {
  interface Request {
    user?: any;
  }
}
