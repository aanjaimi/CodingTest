import { Controller, Get, UseGuards, Param, Query } from '@nestjs/common';
import { UserService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { User } from '@prisma/client';
import { UserQueryDTO } from './users.dto';
import { CurrentUser } from '../global/global.decorators';

@Controller('/users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(@CurrentUser() user: User, @Query() query: UserQueryDTO) {
    return await this.userService.getUsers(user.id, query);
  }

  @Get(':id')
  async findOne(@CurrentUser() user: User, @Param('id') login: string) {
    return await this.userService.getUser(user, login);
  }
}
