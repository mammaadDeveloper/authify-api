import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ENV_TYPE } from './common/types/config.type';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Configuration
  const config = app.get(ConfigService);

  // Global prefix
  app.setGlobalPrefix(config.get('app.prefix'));

  // Enable versioning if configured
  if (config.get<boolean>('app.api_version'))
    app.enableVersioning({ type: VersioningType.URI });

  // Enable CORS
  app.enableCors({
    origin: config.get<boolean>('app.cors_origin', true),
    credentials: config.get<boolean>('app.cors_credentials', true),
  });

  // Use global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  // Start the application
  const port = config.get<number>('app.port');
  const env = config.get<ENV_TYPE>('app.env');
  await app.listen(port);

  // Log application start
  if (env == 'development')
    Logger.verbose(`Application running on port ${port}`);
}
bootstrap();
