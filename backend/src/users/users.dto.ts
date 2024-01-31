import { IsString } from 'class-validator';

export class UserQueryDTO {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
