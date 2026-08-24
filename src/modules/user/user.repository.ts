import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserCreateInput } from 'src/database/models';

@Injectable()
export class UserRepository {
  constructor(private readonly db: DatabaseService) {}

  async findMany() {
    return await this.db.user.findMany();
  }

  async findById(id: number) {
    return await this.db.user.findFirst({
      where: { id },
    });
  }

  async findByName(name: string) {
    return await this.db.user.findFirst({ where: { name } });
  }

  async create(data: UserCreateInput) {
    return await this.db.user.create({ data });
  }
}
