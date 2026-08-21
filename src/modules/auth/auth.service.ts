import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserCreateInput } from 'src/database/models';
import { SignUpResponse } from './dto/response.dto';
import { I18nService } from 'nestjs-i18n';
type SigninData = {
  email: string;
  password: string;
};
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly i18n: I18nService,
  ) {}

  signup(data: UserCreateInput) {
    const user = this.userService.create(data);

    if (!user)
      throw new InternalServerErrorException(
        this.i18n.translate('messages.errors.internal'),
      );

    return new SignUpResponse({
      access: 'access_token',
      refresh: 'refresh_token',
    });
  }

  signin(data: SigninData) {
    console.log(data);
  }

  signout() {}

  refresh() {}
}
