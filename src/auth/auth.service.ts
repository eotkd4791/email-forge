import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { type Config } from '@/config/config.schema';
import { catchError, map } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<Config>,
  ) {}

  validateToken(token: string) {
    const authServerUrl = this.configService.get('AUTH_SERVER_URL', { infer: true });

    if (!authServerUrl) {
      throw new UnauthorizedException('인증 서버 URL이 설정되지 않았습니다.');
    }

    return this.httpService
      .post<{ isValid: boolean }>(authServerUrl, { token }, { headers: { Authorization: token } })
      .pipe(
        map(({ data }) => {
          if (data.isValid) {
            return data;
          }
          throw new UnauthorizedException('유효하지 않은 토큰입니다.');
        }),
        catchError(error => {
          if (error instanceof UnauthorizedException) {
            console.error(error.message);
          }
          throw error;
        }),
      );
  }
}
