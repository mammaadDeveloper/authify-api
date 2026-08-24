import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserCreateInput } from 'src/database/models';
import { I18nService } from 'nestjs-i18n';
import { HASH_SERVICE, HashService } from 'src/shared/encryption/hash.service';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly i18n: I18nService,
    @Inject(HASH_SERVICE)
    private readonly hash: HashService,
  ) {}

  async findByName(name: string) {
    return await this.repository.findByName(name);
  }

  async create(data: UserCreateInput) {
    const user = await this.findByName(data.name);

    if (user)
      throw new ConflictException(
        this.i18n.translate('messages.errors.user_already_exists'),
      );

    const userData = { ...data, password: this.hash.hash(data.password) };

    return await this.repository.create(userData);
  }
  findById(id: number) {
    return this.repository.findById(id);
  }
}
