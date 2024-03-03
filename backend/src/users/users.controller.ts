import {
  Controller,
  Get,
  UseGuards,
  Param,
  Query,
  Body,
  Patch,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  Post,
  Delete,
} from '@nestjs/common';
import { UserService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { User } from '@prisma/client';
import { UserQueryDTO } from './users.dto';
import { CurrentUser } from '../global/global.decorators';
import { UserUpdateDTO } from './users.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(@CurrentUser() user: User, @Query() query: UserQueryDTO) {
    return await this.userService.getUsers(user.id, query);
  }

  @Get(':username')
  async findOne(
    @CurrentUser() user: User,
    @Param('username') username: string,
  ) {
    return await this.userService.getUser(user, username);
  }

  @Patch(':username')
  // @UseInterceptors(FileInterceptor('avatar'))
  async update(
    @CurrentUser() user: User,
    // @UploadedFile(
    //   new ParseFilePipeBuilder()
    //     .addFileTypeValidator({
    //       fileType: /^image\/(jpg|jpeg|png|gif)$/,
    //     })
    //     .build({
    //       errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    //       fileIsRequired: false,
    //     }),
    // )
    // avatar: Express.Multer.File,
    @Body() body: any,
  ) {
    return await this.userService.updateUser(user, body);
  }
}
