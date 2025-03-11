import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // allows requests from one origin to another
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
