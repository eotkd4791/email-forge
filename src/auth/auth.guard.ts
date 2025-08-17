import { type CanActivate, type ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { type Request } from 'express';
import { catchError, map, type Observable } from 'rxjs';
import { AuthService } from '@/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('인증 토큰이 없습니다.');
    }

    return this.authService.validateToken(token).pipe(
      map(({ isValid }) => isValid),
      catchError(error => {
        console.error(error);
        throw new UnauthorizedException('유효하지 않은 토큰입니다.');
      }),
    );
  }
}
