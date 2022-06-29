import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
// import { join } from 'path';
import { AppModule } from './app.module';
import config from './utils/config';
// import { RedisIoAdapter } from './utils/redis.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v3/')

  const devOrigins = [
    'http://localhost',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'localho.st:3000',
  ];
  const prodOrigins = [
    'https://edfhr.org',
    'http://edfhr.org',
    'https://team.edfhr.org',
    'https://portal.edfhr.org',
    'https://portal-dev.edfhr.org',
  
    /\.edfhr\.org$/,
  ];

  const origin = devOrigins

  app.enableCors(
    {
      origin,
  
      credentials: true,
    }
  );

  // app.useWebSocketAdapter(new RedisIoAdapter(app));
  const PORT = process.env.PORT || 8000;
  app.use(express.json({ limit: '50mb' }));
  app.useGlobalPipes(new ValidationPipe());

  // app.setGlobalPrefix('api/v3');
  await app.listen(PORT, () => {
    Logger.log(`server started on port ${PORT}`);
  });
}
bootstrap();
