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
import { QuestionService } from './questions.service';
// import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { User } from '@prisma/client';
import { QuestionLikeDTO, QuestionQueryDTO } from './questions.dto';
import { CurrentUser } from '../global/global.decorators';
// import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/questions')
// @UseGuards(JwtAuthGuard)
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Get()
  async findAll() {
    return await this.questionService.getAllQuestions();
  }

  @Get(':id')
  async findOne(@CurrentUser() user: User) {
    return await this.questionService.getQuestion(user);
  }

  @Post()
  async createQuestion(@Body() body: QuestionQueryDTO) {
    return await this.questionService.createQuestion(body);
  }

  @Get('/user/:id')
  async getQuestionsOfUser(@Param('id') id: string) {
    return await this.questionService.getQuestionsOfUser(id);
  }

  @Get('/like/:id')
  async getLike(@Param('id') id: string, @Body() body: QuestionLikeDTO) {
    return await this.questionService.getLike(id, body);
  }

  @Post('/like/:id')
  async addLike(@Param('id') id: string, @Body() body: QuestionLikeDTO) {
    return await this.questionService.addLike(id, body);
  }

  @Delete('/like/:id')
  async removeLike(@Param('id') id: string, @Body() body: QuestionLikeDTO) {
    return await this.questionService.removeLike(id, body);
  }

  @Get('/favorite/:id')
  async getFavorite(@Param('id') id: string, @Body() body: QuestionLikeDTO) {
    return await this.questionService.getFavorite(id, body);
  }

  @Post('/favorite/:id')
  async addFavorite(@Param('id') id: string, @Body() body: QuestionLikeDTO) {
    return await this.questionService.addFavorite(id, body);
  }

  @Delete('/favorite/:id')
  async removeFavorite(@Param('id') id: string, @Body() body: QuestionLikeDTO) {
    return await this.questionService.removeFavorite(id, body);
  }
}
