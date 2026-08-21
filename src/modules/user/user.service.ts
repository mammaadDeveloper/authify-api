import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserCreateInput } from 'src/database/models';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly i18n: I18nService,
  ) {}

  findByName(name: string) {
    return this.repository.findByName(name);
  }

  create(data: UserCreateInput) {
    const user = this.findByName(data.name);

    if (user)
      throw new ConflictException(
        this.i18n.translate('messages.errors.user_already_exists'),
      );

    return this.repository.create(data);
  }
}
