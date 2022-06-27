import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieSession from 'express-session';
import * as passport from 'passport';
import * as express from 'express';
// import { join } from 'path';
import { AppModule } from './app.module';
import config from './utils/config';
import MongoStore = require('connect-mongo');
// import { RedisIoAdapter } from './utils/redis.io';
import * as cookieParser from 'cookie-parser';

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
  // app.use(cookieParser());
  // app.use(
  //   cookieSession({
  //     secret: config.SECRET,
  //     name: '__ed',
  //     saveUninitialized: true,
  //     resave: false,
  //     store: MongoStore.create({
  //       mongoUrl: config.MONGO_URI,
  //       ttl: 14 * 24 * 60 * 60,
  //       autoRemove: 'disabled',

  //       // mongoOptions: mongooseOption,
  //     }),
  //   }),
  // );
  const PORT = process.env.PORT || 8000;
  app.use(express.json({ limit: '50mb' }));
  // app.use(passport.initialize());
  // app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe());

  // app.setGlobalPrefix('api/v3');
  await app.listen(PORT, () => {
    Logger.log(`server started on port ${PORT}`);
  });
}
bootstrap();
