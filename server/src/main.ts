import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Pool } from 'pg';
import ConnectPgSimple from 'connect-pg-simple';
import * as dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const PgStore = ConnectPgSimple(session);
 
  const pgPool = new Pool({
    connectionString: process.env.DATABASE_URL, 
     ssl: { rejectUnauthorized: false },
  idleTimeoutMillis: 60000, // Close idle connections after 60 seconds
  connectionTimeoutMillis: 60000, // Wait longer for a connection
  max: 10, // Limit number of connections
  });
   
  app.useGlobalPipes(new ValidationPipe());

  // Get TypeORM DataSource instance
  const dataSource = app.get(DataSource);

  app.use(
    cors({
      origin: process.env.NODE_ENV === "production"
        ? "https://advocat-mu.vercel.app" // ✅ Use frontend domain in production
        : "http://localhost:3000", // ✅ Local dev
      credentials: true, // ✅ Required for session cookies
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
        pool: pgPool,
        createTableIfMissing: true,
      }),
      cookie: {
        maxAge: 86400000, // 1 day
        httpOnly: true,
        secure:false,
        sameSite: 'lax' 
      },
    }),
  );

  // Initialize Passport.js for authentication
  app.use(passport.initialize());
  app.use(passport.session());


  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // You already have this
      whitelist: true,
      forbidNonWhitelisted: false, // temporary
    }),
  );
  

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
  console.log(`🚀 Server running on http://localhost:${PORT}`);


}
bootstrap();
