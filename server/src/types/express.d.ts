import { Request } from 'express';
declare module 'express' {
  interface Request {
    isAuthenticated(): boolean;
    user?: any; // Adjust to match your User type
    logIn(user: any, done: (err: any) => void): void;
    logOut(): void;
  }}
