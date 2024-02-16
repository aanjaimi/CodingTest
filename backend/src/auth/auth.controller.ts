import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  Param,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { User } from '@prisma/client';
import { CurrentUser } from '../global/global.decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('check-existing')
  async checkExisting(@Req() req: Request) {
    return this.authService.checkExisting(req);
  }

  @Post('reset')
  async reset(@Req() req: Request) {
    return this.authService.reset(req);
  }

  @Post('reset-password')
  async resetPassword(@Req() req: Request) {
    return this.authService.resetPassword(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    return this.authService.logout(req, res);
  }

  @Get('login')
  async login(@Req() req: Request, @Res() res: Response) {
    return this.authService.login(req, res);
  }

  @Post('register')
  async register(@Req() req: Request, @Res() res: Response) {
    this.authService.register(req, res);
  }

  @Get('@me')
  async getMe(@CurrentUser() user: User) {
    return user;
  }

  // TODO: remove later
  @Get('/token/:login')
  getToken(@Param('login') login: string) {
    return this.authService.getToken(login);
  }
}
