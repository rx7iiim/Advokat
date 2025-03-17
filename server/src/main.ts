import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import { TypeormStore } from 'connect-typeorm';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Pool } from 'pg';
import PgSession from 'connect-pg-simple';
import ConnectPgSimple from 'connect-pg-simple';
import { SessionEntity } from './session/session.entity';
import * as dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';

import { url } from 'inspector';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const PgStore = ConnectPgSimple(session);
 
  const pgPool = new Pool({
    connectionString: process.env.DATABASE_URL, // Correct property name
  });
   
  app.useGlobalPipes(new ValidationPipe());

  // Get TypeORM DataSource instance
  const dataSource = app.get(DataSource);

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true); // Accepts all origins
    },
    credentials: true, // Allow cookies & session authentication
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



  // Configure session management with TypeORM Store
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'supersecret',
      resave: false,
      saveUninitialized: false,
      store: new PgStore({
        pool: pgPool, // Use the existing PostgreSQL connection pool
        createTableIfMissing: true, // Optional: specify a custom table name
      }),
      cookie: {
        maxAge: 86400000, // 1 day
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production
      },
    }),
  );

  // Initialize Passport.js for authentication
  app.use(passport.initialize());
  app.use(passport.session());

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
}
bootstrap();
