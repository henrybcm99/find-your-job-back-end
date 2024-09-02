import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async login(data: { email: string; password: string; emailV: boolean }) {
    const payload = { email: data.email };
    const token = await this.jwtService.signAsync(payload);
    return {
      token,
      email: data.email,
      emailV: data.emailV,
    };
  }
}
