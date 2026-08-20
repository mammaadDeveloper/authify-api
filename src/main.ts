import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { Logger, VersioningType } from '@nestjs/common';
import { ENV_TYPE } from './common/types/config.type';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Configuration
  const config = app.get(ConfigService);

  // Global prefix
  app.setGlobalPrefix('api');

  // Enable versioning if configured
  app.enableVersioning({ type: VersioningType.URI });

  // Enable CORS
  app.enableCors({
    origin: config.get<boolean>('app.cors_origin', true),
    credentials: config.get<boolean>('app.cors_credentials', true),
  });

  // Use global validation pipe
  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Filters
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({ detailedErrors: false }),
  );

  // Start the application
  const port = config.get<number>('app.port');
  const host = config.get('app.host');
  const env = config.get<ENV_TYPE>('app.env');
  await app.listen(port, host);

  // Log application start
  if (env == 'development')
    Logger.verbose(`Application running on port ${port}`);
}
bootstrap();
