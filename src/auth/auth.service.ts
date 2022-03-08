import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { IToken } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getByUsername(username);

    if (user) {
      const isPasswordValid = await bcrypt.compare(pass, user.hash);
      if (isPasswordValid) {
        const { hash, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload: IToken = {
      userId: user.userId,
      username: user.username,
      role: user.role,
    };
    return {
      token: this.jwtService.sign(payload),
      user,
    };
  }
}
