import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {
  PrometheusModule,
  makeCounterProvider,
  makeGaugeProvider,
  makeHistogramProvider,
} from '@willsoto/nestjs-prometheus';
import { MetricsInterceptor } from './metrics.interceptor';
import { MetricsProvider } from './metrics.provider';

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
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status'],
    }),
    makeHistogramProvider({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status'],
      buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
    }),
    makeCounterProvider({
      name: 'email_attempts_total',
      help: 'Attempts',
      labelNames: ['campaign_id', 'provider'],
    }),
    makeCounterProvider({
      name: 'email_sent_total',
      help: 'Sent',
      labelNames: ['campaign_id', 'provider'],
    }),
    makeCounterProvider({
      name: 'email_failed_total',
      help: 'Failed',
      labelNames: ['campaign_id', 'provider', 'reason'],
    }),
    makeCounterProvider({
      name: 'email_bounced_total',
      help: 'Bounced',
      labelNames: ['campaign_id', 'provider', 'type'],
    }),
    makeHistogramProvider({
      name: 'email_processing_duration_seconds',
      help: 'End-to-end processing',
      labelNames: ['queue'],
      buckets: [0.05, 0.1, 0.25, 0.5, 1, 2, 5, 10, 30],
    }),
    makeGaugeProvider({
      name: 'email_queue_size',
      help: 'Queue depth',
      labelNames: ['queue'],
    }),
    makeHistogramProvider({
      name: 'provider_response_seconds',
      help: 'Provider API latency',
      labelNames: ['provider', 'op'],
      buckets: [0.05, 0.1, 0.25, 0.5, 1, 2, 5, 10],
    }),
    makeGaugeProvider({
      name: 'worker_heartbeat',
      help: 'Worker up=1',
      labelNames: ['instance'],
    }),
  ],
  exports: [MetricsProvider],
})
export class MetricsModule {}
