import {
  createHash,
  createHmac,
  HashOptions,
  randomBytes,
  timingSafeEqual,
} from 'crypto';
// import * as Forge from 'node-forge';

export type HashAlgo = 'sha512' | 'sha256' | 'md5';

class Encrypt {
  private SECRET_KEY;
  constructor() {
    this.SECRET_KEY = process.env.SECRET_KEY;
  }
  /**
   * Generate new password hash
   * *i.e this is to strengthen users password or pin
   * @param pwd String
   */
  generatePassword(pwdStr: string, salt?: string): string {
    if (!salt) {
      salt = randomBytes(16).toString('hex');
    }
    return `${salt}:${this.secureHash(pwdStr, 'sha256', salt)}`;
  }

  /**
   * Compare if two password are equal while preventing timing attack
   * @param password string
   * @param source string
   * @returns boolean
   */
  isPasswordOrPinCorrect(password: string, source: string) {
    const salt = source.split(':')[0];
    const padding = 5;
    const bufferLength = Buffer.from(source).length + padding;
    const sourceBuffer = Buffer.alloc(bufferLength, source);
    const passwordBuffer = Buffer.alloc(
      bufferLength,
      this.generatePassword(password, salt),
    );
    return timingSafeEqual(passwordBuffer, sourceBuffer);
  }


  /**
   * Generate hash from provider parameters
   * @param str:[String]
   */
  static hash(str: string, algo?: HashAlgo, salt?: HashOptions): string {
    // if (!str) {
    //   throw 'invalid pin. exit h1';
    // }
    const hash = createHash(algo || 'sha512', salt);

    hash.update(str);
    return hash.digest('hex');
  }

  /**
   * Generate hash from provider parameters
   * @param str:[String]
   */
  secureHash(str: string, algo?: HashAlgo, salt?: string): string {

    const hash = createHmac(algo || 'sha512', salt ?? '|_|');

    hash.update(str);
    return hash.digest('hex');
  }


}

export default Encrypt;
