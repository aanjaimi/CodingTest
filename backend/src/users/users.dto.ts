import {
  IsBoolean,
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  IsDate,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UserQueryDTO {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class UserUpdateDTO {
  @IsString({})
  @MinLength(1)
  @MaxLength(32)
  firstName: string;

  @IsString({})
  @MinLength(1)
  @MaxLength(32)
  lastName: string;

  @IsOptional()
  @IsString({})
  bio: string;

  @IsOptional()
  @IsString({})
  location: string;

  @IsOptional()
  @IsString({})
  @Transform(({ value }) => new Date(value))
  birthday: Date;
}

export class FollowQueryDTO {
  @IsString()
  myId: string;

  @IsString()
  id: string;
}
