import { IsArray, IsNotEmpty, IsString, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from '@/email/dto/user.dto';

export class SendPrivacyPolicyUpdateDto {
  @IsArray({ message: '사용자 목록이 배열이어야 합니다.' })
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  users: UserDto[];

  @IsNotEmpty({ message: '정책 링크가 없습니다.' })
  @IsUrl({}, { message: '정책 링크가 올바르지 않습니다.' })
  policyLink: string;

  @IsNotEmpty({ message: '제목이 없습니다.' })
  @IsString({ message: '제목 형식이 올바르지 않습니다.' })
  subject: string;
}
