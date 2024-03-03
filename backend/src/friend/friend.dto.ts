import { IsString } from 'class-validator';

export class FollowQueryDTO {
  @IsString()
  myId: string;

  @IsString()
  id: string;
}
