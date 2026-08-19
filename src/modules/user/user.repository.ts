import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserCreateInput } from 'src/database/models';

@Injectable()
export class UserRepository {
  constructor(private readonly db: DatabaseService) {}

  findMany() {
    return this.db.user.findMany();
  }

  findById(id: number) {
    return this.db.user.findFirst({
      where: { id },
    });
  }

  findByName(name: string) {
    return this.db.user.findFirst({ where: { name } });
  }

  create(data: UserCreateInput) {
    return this.db.user.create({ data });
  }
}
