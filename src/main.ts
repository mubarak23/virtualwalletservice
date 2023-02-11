import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors({
  //   allowedHeaders: '*',
  //   origin: '*',
  //   methods: ['GET', 'POST'],
  //   credentials: true,
  // });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  app.setGlobalPrefix('v1/api');
  await app.listen(3000);
}
bootstrap();
