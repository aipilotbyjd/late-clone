import * as crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;

export class EncryptionUtil {
  static encrypt(text: string, key: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(
      ALGORITHM,
      Buffer.from(key, 'hex'),
      iv,
    );
    const encrypted = Buffer.concat([
      cipher.update(text, 'utf8'),
      cipher.final(),
    ]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  static decrypt(enc: string, key: string): string {
    const [ivHex, encryptedHex] = enc.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encryptedText = Buffer.from(encryptedHex, 'hex');
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      Buffer.from(key, 'hex'),
      iv,
    );
    const decrypted = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);
    return decrypted.toString('utf8');
  }
}
