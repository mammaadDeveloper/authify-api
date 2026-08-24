import { Global, Module } from '@nestjs/common';
import { EncryptService } from './encrypt.service';
import { HASH_SERVICE, Sha256HashService } from './hash.service';

@Global()
@Module({
  providers: [
    {
      provide: HASH_SERVICE,
      useClass: Sha256HashService,
    },
    EncryptService,
  ],
  exports: [HASH_SERVICE, EncryptService],
})
export class EncryptionModule {}
