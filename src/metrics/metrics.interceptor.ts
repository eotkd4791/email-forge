import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  type NestInterceptor,
  HttpException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { type Histogram, type Counter } from 'prom-client';
import { type Observable, tap, catchError, throwError } from 'rxjs';
import { InjectMetric } from '@willsoto/nestjs-prometheus';

type RequestWithRoute = Omit<Request, 'route'> & {
  route?: { path?: string };
};

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(
    @InjectMetric('http_requests_total') private readonly counter: Counter<string>,
    @InjectMetric('http_request_duration_seconds') private readonly hist: Histogram<string>,
  ) {}

  intercept<T>(ctx: ExecutionContext, next: CallHandler<T>): Observable<T> {
    if (ctx.getType() !== 'http') return next.handle();

    const req = ctx.switchToHttp().getRequest<RequestWithRoute>();
    const start = process.hrtime.bigint();

    return next.handle().pipe(
      tap(() => {
        const res = ctx.switchToHttp().getResponse<Response>();
        this.recordMetrics(req, res.statusCode, start);
      }),
      catchError((err: unknown) => {
        const status = err instanceof HttpException ? err.getStatus() : 500;
        this.recordMetrics(req, status, start);
        return throwError(() => err);
      }),
    );
  }

  private recordMetrics(req: RequestWithRoute, status: number, start: bigint) {
    const method = req.method;
    const route = req.route?.path ?? req.path ?? req.url ?? 'unknown';
    const duration = Number(process.hrtime.bigint() - start) / 1e9;

    this.counter.labels(method, route, status.toString()).inc();
    this.hist.labels(method, route, status.toString()).observe(duration);
  }
}
