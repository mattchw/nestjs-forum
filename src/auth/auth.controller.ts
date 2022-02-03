import { Controller, Post, UseGuards, Body, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth.dto';
import { LocalAuthGuard } from '../auth/guard/local-auth.guard';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req,
    @Body() body: AuthLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const loginRes = await this.authService.login(req.user);
    res.cookie('token', loginRes.token, { sameSite: 'none', secure: true });
    return loginRes;
  }
}
