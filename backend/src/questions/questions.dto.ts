import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class QuestionQueryDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  topic: string;

  @IsString()
  userId: string;
}

export class QuestionUpdateDTO {
  @IsOptional()
  @IsString({})
  @MinLength(4)
  @MaxLength(32)
  title: string;

  // @Transform((obj) => obj.value === 'true' || obj.value === true)
  // @IsBoolean()
  // @IsOptional()
  // 'tfa': boolean;
}

export class QuestionLikeDTO {
  @IsString()
  questionId: string;
}
