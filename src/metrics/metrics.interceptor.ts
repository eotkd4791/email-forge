import { type NestInterceptor, type CallHandler, type ExecutionContext, Injectable } from '@nestjs/common';
import type { Request, Response } from 'express';
import { type Histogram, type Counter } from 'prom-client';
import { type Observable, tap } from 'rxjs';
import { InjectMetric } from '@willsoto/nestjs-prometheus';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(
    @InjectMetric('http_requests_total') private readonly counter: Counter<string>,
    @InjectMetric('http_request_duration_seconds') private readonly hist: Histogram<string>,
  ) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const { method, url, body } = ctx.getArgByIndex<MetricsData>(0);
    const start = process.hrtime.bigint();

    return next.handle().pipe(
      tap(() => {
        const res = ctx.switchToHttp().getResponse<Response>();
        this.recordMetrics({ method, url, body }, res.statusCode, start);
      }),
    );
  }

  private recordMetrics(metrics: MetricsData, status: number, start: bigint) {
    const duration = Number(process.hrtime.bigint() - start) / 1e9;
    this.counter.labels(metrics.method, metrics.url, status.toString()).inc();
    this.hist.labels(metrics.method, metrics.url, status.toString()).observe(duration);
  }
}

type MetricsData = {
  method: string;
  url: string;
  body: unknown;
};
