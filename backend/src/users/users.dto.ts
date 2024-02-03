import {
  IsBoolean,
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UserQueryDTO {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class UserUpdateDTO {
  @IsOptional()
  @IsString({})
  @MinLength(4)
  @MaxLength(32)
  displayname: string;

  @Transform((obj) => obj.value === 'true' || obj.value === true)
  @IsBoolean()
  @IsOptional()
  'tfa': boolean;
}
