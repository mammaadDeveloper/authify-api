import { createHash, timingSafeEqual } from 'crypto';

export const HASH_SERVICE = Symbol('HASH_SERVICE');

export interface HashService {
  hash(text: string): string;
  compare(text: string, hashed: string): boolean;
}

export class Sha256HashService implements HashService {
  hash(value: string): string {
    return createHash('sha256').update(value, 'utf8').digest('hex');
  }

  compare(value: string, hash: string): boolean {
    const hashedValue = this.hash(value);

    const hashedBuffer = Buffer.from(hashedValue, 'hex');
    const hashBuffer = Buffer.from(hash, 'hex');

    if (hashedBuffer.length !== hashBuffer.length) {
      return false;
    }

    return timingSafeEqual(hashedBuffer, hashBuffer);
  }
}
