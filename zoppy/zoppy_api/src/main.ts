import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // facinho habilitar o cors aqui...benzaDeus
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
