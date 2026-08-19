import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { Logger, VersioningType } from '@nestjs/common';
import { ENV_TYPE } from './common/types/config.type';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const config = app.get(ConfigService);

  app.setGlobalPrefix(config.get('app.prefix'));

  if (config.get<boolean>('app.api_version'))
    app.enableVersioning({ type: VersioningType.URI });

  app.enableCors({
    origin: config.get<boolean>('app.cors_origin', true),
    credentials: config.get<boolean>('app.cors_credentials', true),
  });

  const port = config.get<number>('app.port');
  const env = config.get<ENV_TYPE>('app.env');
  await app.listen(port);

  if (env == 'development')
    Logger.verbose(`Application running on port ${port}`);
}
bootstrap();
