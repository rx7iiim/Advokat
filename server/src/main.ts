import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const modules = app.select(AppModule).toString();
  console.log('Loaded modules:', modules);  // ✅ Print loaded modules

  await app.listen(3000);
}
bootstrap();
