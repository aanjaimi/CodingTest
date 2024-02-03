import { Module } from '@nestjs/common';
import { QuestionService } from './questions.service';
import { QuestionController } from './questions.controller';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  imports: [],
  controllers: [QuestionController],
  providers: [QuestionService, JwtStrategy],
})
export class QuestionModule {}
