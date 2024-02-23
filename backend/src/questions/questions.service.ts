import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  QuestionAnswerDTO,
  QuestionAnswerUpdateDTO,
  QuestionLikeDTO,
  QuestionQueryDTO,
} from './questions.dto';
import { Topic, User } from '@prisma/client';

@Injectable()
export class QuestionService {
  constructor(private prismaService: PrismaService) {}

  async getAllQuestions() {
    const questions = await this.prismaService.question.findMany({
      include: {
        user: true,
        answers: true,
        favorites: true,
        questionLikes: true,
      },
    });
    return questions;
  }

  async getQuestion(currUser: User) {
    const questions = await this.prismaService.question.findFirst({
      where: {
        userId: currUser.id,
      },
      include: {
        user: true,
        answers: true,
        favorites: true,
        questionLikes: true,
      },
    });

    return questions;
  }

  async createQuestion(body: QuestionQueryDTO) {
    const question = await this.prismaService.question.create({
      data: {
        title: body.title,
        content: body.content,
        topic: Topic[body.topic] as Topic,
        location: '',
        userId: body.userId,
      },
    });
    return question;
  }

  async getQuestionsOfUser(id: string) {
    const questions = await this.prismaService.question.findMany({
      where: {
        userId: id,
      },
      include: {
        user: true,
        answers: true,
        favorites: true,
        questionLikes: true,
      },
    });
    return questions;
  }

  async getLike(id: string, body: QuestionLikeDTO) {
    const { questionId } = body;
    const question = await this.prismaService.questionLike.count({
      where: {
        userId: id,
        questionId: questionId,
      },
    });
    return question > 0 ? true : false;
  }

  async addLike(id: string, body: QuestionLikeDTO) {
    const { questionId } = body;
    const question = await this.prismaService.questionLike.create({
      data: {
        userId: id,
        questionId: questionId,
      },
    });
    return question;
  }

  async removeLike(id: string, body: QuestionLikeDTO) {
    const { questionId } = body;
    const question = await this.prismaService.questionLike.deleteMany({
      where: {
        userId: id,
        questionId: questionId,
      },
    });
    return question;
  }

  async getFavorite(id: string, body: QuestionLikeDTO) {
    const { questionId } = body;
    const question = await this.prismaService.favorite.count({
      where: {
        userId: id,
        questionId: questionId,
      },
    });
    return question > 0 ? true : false;
  }

  async addFavorite(id: string, body: QuestionLikeDTO) {
    const { questionId } = body;
    const question = await this.prismaService.favorite.create({
      data: {
        userId: id,
        questionId: questionId,
      },
    });
    return question;
  }

  async removeFavorite(id: string, body: QuestionLikeDTO) {
    const { questionId } = body;
    const question = await this.prismaService.favorite.deleteMany({
      where: {
        userId: id,
        questionId: questionId,
      },
    });
    return question;
  }

  async addAnswer(id: string, body: QuestionAnswerDTO) {
    const { questionId, content } = body;
    const question = await this.prismaService.answer.create({
      data: {
        userId: id,
        content: content,
        questionId: questionId,
      },
    });
    return question;
  }

  async removeAnswer(id: string) {
    const question = await this.prismaService.answer.deleteMany({
      where: {
        id: id,
      },
    });
    return question;
  }

  async updateAnswer(id: string, body: QuestionAnswerUpdateDTO) {
    const { content } = body;
    const question = await this.prismaService.answer.update({
      where: {
        id: id,
      },
      data: {
        content: content,
      },
    });
    return question;
  }
}
