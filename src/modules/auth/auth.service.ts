import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserCreateInput } from 'src/database/models';
import { SignUpResponse } from './dto/response.dto';
import { I18nService } from 'nestjs-i18n';
import { TokenService } from '../token/token.service';
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

  signin(data: SigninData) {
    console.log(data);
  }

  signout() {}

  refresh() {}
}
