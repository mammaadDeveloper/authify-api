import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { TokenCreateInput } from 'src/database/models';

@Injectable()
export class TokenRepository {
  constructor(private readonly db: DatabaseService) {}

  async saveToken(data: TokenCreateInput) {
    return await this.db.token.create({ data });
  }
}
