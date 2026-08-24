import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { TokenCreateInput } from 'src/database/models';
import { TokenStatus } from 'src/database/enums';

@Injectable()
export class TokenRepository {
  constructor(private readonly db: DatabaseService) {}

  async saveToken(data: TokenCreateInput) {
    return await this.db.token.create({ data });
  }

  async findActiveToken(token: string, userId: number) {
    return await this.db.token.findFirst({
      where: {
        token,
        userId,
        status: TokenStatus.ACTIVATE,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
    });
  }

  async revokeToken(id: string) {
    return await this.db.token.update({
      where: { id },
      data: { revokedAt: new Date(), status: TokenStatus.REVOKED },
    });
  }

  async revokeUserTokens(userId: number) {
    return await this.db.token.updateMany({
      where: {
        userId,
        status: TokenStatus.ACTIVATE,
        revokedAt: null,
      },
      data: { revokedAt: new Date(), status: TokenStatus.REVOKED },
    });
  }
}
