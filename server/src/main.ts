import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'process';

async function bootstrap() {
  const PORT = 3005;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Allow only your frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies if needed
  });

  const modules = app.select(AppModule).toString();
  console.log('Loaded modules:', modules);  // ✅ Print loaded modules

  await app.listen(PORT);
}
bootstrap();
