import { Expose } from 'class-transformer';

export class SignUpResponse {
  @Expose()
  access: string;

  @Expose()
  refresh: string;

  constructor(data: Partial<SignUpResponse>) {
    Object.assign(this, data);
  }
}
