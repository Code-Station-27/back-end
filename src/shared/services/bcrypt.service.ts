import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  async hash(plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, 10);
  }

  async compare(plaintext: string, ciphertext: string): Promise<boolean> {
    return bcrypt.compare(plaintext, ciphertext);
  }
}
