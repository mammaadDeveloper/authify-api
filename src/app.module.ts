import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import databaseConfig from './config/database.config';
import { I18nModule } from 'nestjs-i18n';
import path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),
    DatabaseModule,
    I18nModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.get('app.fallback_locale'),
        loaderOptions: {
          path: path.join(__dirname, 'i18n'),
          watch: configService.get('app.env') == 'development',
        },
        typesOutputPath: path.join(
          __dirname,
          '/i18n/generated/i18n.generated.ts',
        ),
      }),
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
