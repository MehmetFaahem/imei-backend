import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  Logger,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import configuration from './config/configuration';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = configuration.call(this);
  const appVersion = '/api';

  const builder = new DocumentBuilder()
    .setTitle('IMEI REST API')
    .setDescription('IMEI REST API')
    .setVersion('1.0')
    .addServer(appVersion)
    .build();
  const document = SwaggerModule.createDocument(app, builder);
  SwaggerModule.setup(appVersion + '/docs', app, document);

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        if (validationErrors[0].children.length)
          return new BadRequestException(
            Object.values(validationErrors[0].children[0].constraints)[0],
          );
        else
          return new BadRequestException(
            Object.values(validationErrors[0].constraints)[0],
          );
      },
    }),
  );

  app.setGlobalPrefix(appVersion);
  // const corsOptions = {
  //   origin: '*',
  //   optionSuccessStatus: 200,
  // };
  // app.use(cors(corsOptions));

  const port = config.port || 3000;
  await app.listen(port);
  Logger.log(port, 'AppsRunningPort');
}
bootstrap();
