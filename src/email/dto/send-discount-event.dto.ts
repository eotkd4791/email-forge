import { IsArray, IsNotEmpty, IsString, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from './user.dto';

export class SendDiscountEventDto {
  @IsArray({ message: '사용자 목록 형식이 올바르지 않습니다.' })
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  users: UserDto[];

  @IsNotEmpty({ message: '이벤트 링크가 없습니다.' })
  @IsUrl({}, { message: '이벤트 링크가 올바르지 않습니다.' })
  eventLink: string;

  @IsNotEmpty({ message: '제목이 없습니다.' })
  @IsString({ message: '제목 형식이 올바르지 않습니다.' })
  subject: string;
}
