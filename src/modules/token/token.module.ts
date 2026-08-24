import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { UserModule } from '../user/user.module';
import { AccessStrategy } from './strategies/access.strategy';
import { RefreshStrategy } from './strategies/refresh.strategy';
import { AccessGuard } from './guards/access.guard';
import { RefreshGuard } from './guards/refresh.guard';
import { TokenRepository } from './token.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('jwt.access.secret'),
      }),
    }),
  ],
  providers: [
    TokenRepository,
    TokenService,
    AccessStrategy,
    RefreshStrategy,
    AccessGuard,
    RefreshGuard,
  ],
  exports: [TokenService, AccessGuard, RefreshGuard],
})
export class TokenModule {}
