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
} from '@nestjs/common';
import { QuestionService } from './questions.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { User } from '@prisma/client';
import { QuestionQueryDTO, QuestionUpdateDTO } from './questions.dto';
import { CurrentUser } from '../global/global.decorators';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Get('/size/:id')
  async getQuestionsSize(@Param('id') id: string) {
    return await this.questionService.getQuestionsSize(id);
  }
}
