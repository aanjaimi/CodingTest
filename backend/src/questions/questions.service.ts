import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuestionQueryDTO, QuestionUpdateDTO } from './questions.dto';
import { Prisma, Question, Topic, User } from '@prisma/client';

@Injectable()
export class QuestionService {
  constructor(private prismaService: PrismaService) {}

  async getAllQuestions() {
    const questions = await this.prismaService.question.findMany();
    return questions;
  }

  async getQuestion(currUser: User) {
    const questions = await this.prismaService.question.findFirst({
      where: {
        userId: currUser.id,
      },
    });

    return questions;
  }

  async createQuestion(body: QuestionQueryDTO) {
    const question = await this.prismaService.question.create({
      data: {
        title: body.title,
        content: body.content,
        topic: body.topic as Topic,
        location: '',
        userId: body.userId,
      },
    });
    return question;
  }
}
