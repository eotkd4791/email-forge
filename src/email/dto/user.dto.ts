import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: '사용자명이 없습니다.' })
  @IsString({ message: '사용자명 형식이 올바르지 않습니다.' })
  name: string;

  @IsNotEmpty({ message: '이메일이 없습니다.' })
  @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다.' })
  email: string;
}
