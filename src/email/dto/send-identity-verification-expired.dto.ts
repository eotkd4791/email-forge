import { IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class SendIdentityVerificationExpiredDto {
  @IsNotEmpty({ message: '사용자명이 없습니다.' })
  @IsString({ message: '사용자명 형식이 올바르지 않습니다.' })
  name: string;

  @IsNotEmpty({ message: '이메일이 없습니다.' })
  @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다.' })
  email: string;

  @IsNotEmpty({ message: '제목이 없습니다.' })
  @IsString({ message: '제목 형식이 올바르지 않습니다.' })
  subject: string;

  @IsNotEmpty({ message: '인증 링크가 없습니다.' })
  @IsUrl({}, { message: '인증 링크가 올바르지 않습니다.' })
  verificationLink: string;
}
