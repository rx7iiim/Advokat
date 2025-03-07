import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'strong secret',
      resave: false,
      saveUninitialized: false,
      cookie: { 
        secure: false, 
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
       },
    }),
  );


  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
