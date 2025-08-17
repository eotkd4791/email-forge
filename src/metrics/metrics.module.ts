import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {
  PrometheusModule,
  makeCounterProvider,
  makeGaugeProvider,
  makeHistogramProvider,
} from '@willsoto/nestjs-prometheus';
import { MetricsInterceptor } from '@/metrics/metrics.interceptor';
import { MetricsProvider } from '@/metrics/metrics.provider';

@Module({
  imports: [
    PrometheusModule.register({
      defaultMetrics: { enabled: true },
      path: '/metrics',
    }),
  ],
  providers: [
    MetricsInterceptor,
    {
      provide: APP_INTERCEPTOR,
      useClass: MetricsInterceptor,
    },
    MetricsProvider,
    makeCounterProvider({
      name: 'http_requests_total',
      help: '총 HTTP 요청 수',
      labelNames: ['method', 'route', 'status'],
    }),
    makeHistogramProvider({
      name: 'http_request_duration_seconds',
      help: 'HTTP 요청 처리 시간 (초)',
      labelNames: ['method', 'route', 'status'],
      buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
    }),
    makeCounterProvider({
      name: 'email_attempts_total',
      help: '총 이메일 발송 시도 수',
      labelNames: ['campaign_id', 'provider'],
    }),
    makeCounterProvider({
      name: 'email_sent_total',
      help: '총 이메일 발송 성공 수',
      labelNames: ['campaign_id', 'provider'],
    }),
    makeCounterProvider({
      name: 'email_failed_total',
      help: '총 이메일 발송 실패 수',
      labelNames: ['campaign_id', 'provider', 'reason'],
    }),
    makeCounterProvider({
      name: 'email_bounced_total',
      help: '총 이메일 반송 수',
      labelNames: ['campaign_id', 'provider', 'type'],
    }),
    makeHistogramProvider({
      name: 'email_processing_duration_seconds',
      help: '이메일 전체 처리 시간 (초)',
      labelNames: ['queue'],
      buckets: [0.05, 0.1, 0.25, 0.5, 1, 2, 5, 10, 30],
    }),
    makeGaugeProvider({
      name: 'email_queue_size',
      help: '현재 이메일 큐에 쌓인 작업 수',
      labelNames: ['queue'],
    }),
    makeHistogramProvider({
      name: 'provider_response_seconds',
      help: '외부 이메일 제공업체 API 응답 시간 (초)',
      labelNames: ['provider', 'op'],
      buckets: [0.05, 0.1, 0.25, 0.5, 1, 2, 5, 10],
    }),
    makeGaugeProvider({
      name: 'worker_heartbeat',
      help: '워커 동작 여부 (1이면 동작 중)',
      labelNames: ['instance'],
    }),
  ],
  exports: [MetricsProvider],
})
export class MetricsModule {}
