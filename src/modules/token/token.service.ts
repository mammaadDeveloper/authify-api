import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { HASH_SERVICE, HashService } from 'src/shared/encryption/hash.service';
import { TokenRepository } from './token.repository';

@Injectable()
export class TokenService {
  constructor(
    @Inject(HASH_SERVICE)
    private readonly hash: HashService,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
    private readonly repo: TokenRepository,
  ) {}
  async createToken(user_id: number) {
    const { access, refresh } = this.generate(user_id);

    const hashed = this.hash.hash(refresh);

    await this.repo.saveToken({
      token: hashed,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      user: { connect: { id: user_id } },
    });

    return {
      access,
      refresh,
    };
  }
  private generate(userId: number): { access: string; refresh: string } {
    const access = this.jwt.sign(
      { sub: userId, type: 'access' },
      {
        secret: this.configService.getOrThrow('jwt.access.secret'),
        expiresIn: this.configService.get('jwt.access.expiresIn'),
      },
    );
    const refresh = this.jwt.sign(
      { sub: userId, type: 'refresh' },
      {
        secret: this.configService.getOrThrow('jwt.refresh.secret'),
        expiresIn: this.configService.get('jwt.refresh.expiresIn'),
      },
    );

    return {
      access,
      refresh,
    };
  }
}
