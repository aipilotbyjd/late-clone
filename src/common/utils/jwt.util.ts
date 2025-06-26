import { sign, verify, JwtPayload } from 'jsonwebtoken';

export class JwtUtil {
    static sign(payload: string | object, secret: string, expiresIn: string = '1h'): string {
        return sign(payload, secret, { expiresIn });
    }

    static verify<T = JwtPayload>(token: string, secret: string): T {
        return verify(token, secret) as T;
    }
}
