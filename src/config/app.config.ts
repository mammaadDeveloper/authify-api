import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME || 'NestJs',
  version: process.env.APP_VERSION || '1.0.0',
  url: process.env.APP_URL || 'http://localhost',

  env: process.env.NODE_ENV || 'development',

  host: process.env.HOST || '127.0.0.1',
  port: parseInt(process.env.PORT || '3000') || 3000,

  prefix: process.env.API_PREFIX || '',
  api_version: Boolean(process.env.API_VERSION) || false,
}));
