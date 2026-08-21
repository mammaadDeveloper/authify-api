import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { UserModule } from '../user/user.module';
import { AccessStrategy } from './strategies/access.strategy';
import { RefreshStrategy } from './strategies/refresh.strategy';
import { AccessGuard } from './guards/access.guard';
import { RefreshGuard } from './guards/refresh.guard';

@Module({
  imports: [UserModule],
  providers: [
    TokenService,
    AccessStrategy,
    RefreshStrategy,
    AccessGuard,
    RefreshGuard,
  ],
  exports: [TokenService, AccessGuard, RefreshGuard],
})
export class TokenModule {}
