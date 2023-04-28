import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { Injectable, UnauthorizedException } from '@nestjs/common';

export interface TokenPayload {
  name: string;
  email: string;
  phone: string;
}

@Injectable()
export class JWTService {
  protected jwtSecret: string;
  constructor(private config: ConfigService) {
    this.jwtSecret = this.config.get<string>('jwtSecret');
  }

  public async genAccessToken(payload: TokenPayload): Promise<string> {
    const token = jwt.sign(payload, this.jwtSecret, {
      expiresIn: '30d', // Equivalent to 1 hours
      algorithm: 'HS512',
    });
    return token;
  }

  public async genRefreshToken(email: string) {
    const token = jwt.sign({ email }, this.jwtSecret, {
      expiresIn: 30 * 24 * 60 * 60, // Equivalent to 30 Days
      algorithm: 'HS512',
    });
    return token;
  }

  public async validateToken(token: string): Promise<TokenPayload> {
    try {
      const decode = await jwt.verify(token, this.jwtSecret);
      return decode as TokenPayload;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
