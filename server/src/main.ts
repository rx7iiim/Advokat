import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SessionEntity } from './session/session.entity';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Use global validation pipes
  app.useGlobalPipes(new ValidationPipe());

  // Get TypeORM DataSource instance
  const dataSource = app.get(DataSource);

  // Configure session management with TypeORM Store
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'supersecret',
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore({
        cleanupLimit: 2,
        ttl: 86400, // 1 day
      }).connect(dataSource.getRepository(SessionEntity)),
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
