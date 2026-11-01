import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAndSign(login: string, password: string): Promise<string> {
    const envLogin = this.configService.get<string>('AUTH_LOGIN');
    const envHash = this.configService.get<string>('AUTH_PASSWORD_HASH');

    if (!envLogin || !envHash) {
      throw new Error('AUTH_LOGIN and AUTH_PASSWORD_HASH must be set in .env');
    }

    if (login !== envLogin) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, envHash);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return this.jwtService.signAsync({ sub: login });
  }
}