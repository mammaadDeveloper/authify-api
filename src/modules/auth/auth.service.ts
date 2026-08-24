import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserCreateInput } from 'src/database/models';
import { SignUpResponse } from './dto/response.dto';
import { I18nService } from 'nestjs-i18n';
import { TokenService } from '../token/token.service';
import { HASH_SERVICE, HashService } from 'src/shared/encryption/hash.service';
type SigninData = {
  email: string;
  password: string;
};
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly token: TokenService,
    private readonly i18n: I18nService,
    @Inject(HASH_SERVICE)
    private readonly hash: HashService,
  ) {}

  async signup(data: UserCreateInput) {
    const user = await this.userService.create(data);

    if (!user)
      throw new InternalServerErrorException(
        this.i18n.translate('messages.errors.internal'),
      );

    const { access, refresh } = await this.token.createToken(user.id);

    return new SignUpResponse({
      access: access,
      refresh: refresh,
    });
  }

  async signin(data: SigninData) {
    const user = await this.userService.findByEmail(data.email);

    if (
      !user ||
      !user.password ||
      !this.hash.compare(data.password, user.password)
    ) {
      throw new UnauthorizedException(
        this.i18n.translate('messages.errors.unauthorized'),
      );
    }

    return this.token.createToken(user.id);
  }

  async signout(userId: number) {
    await this.token.revokeUserTokens(userId);
  }

  async refresh(refreshToken: string, userId: number) {
    const tokens = await this.token.rotateToken(refreshToken, userId);

    if (!tokens) {
      throw new UnauthorizedException(
        this.i18n.translate('messages.errors.unauthorized'),
      );
    }

    return tokens;
  }
}
