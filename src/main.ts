import { NestFactory } from '@nestjs/core';
import { GroupModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(GroupModule);
  await app.listen(3000);
}
bootstrap();
