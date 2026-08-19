import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserCreateInput } from 'src/database/models';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  findByName(name: string) {
    return this.repository.findByName(name);
  }

  create(data: UserCreateInput) {
    return this.repository.create(data);
  }
}
