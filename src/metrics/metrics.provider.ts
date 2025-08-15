// providers/metrics.ts
import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Gauge, Histogram } from 'prom-client';

@Injectable()
export class MetricsProvider {
  constructor(
    @InjectMetric('email_attempts_total') private attempts: Counter<string>,
    @InjectMetric('email_sent_total') private sent: Counter<string>,
    @InjectMetric('email_failed_total') private failed: Counter<string>,
    @InjectMetric('email_bounced_total') private bounced: Counter<string>,
    @InjectMetric('email_processing_duration_seconds') private procHist: Histogram<string>,
    @InjectMetric('email_queue_size') private queueSize: Gauge<string>,
    @InjectMetric('provider_response_seconds') private providerHist: Histogram<string>,
    @InjectMetric('worker_heartbeat') private heartbeat: Gauge<string>,
  ) {}

  markAttempt(campaign_id: string, provider: string) {
    this.attempts.labels(campaign_id, provider).inc();
  }
  markSent(campaign_id: string, provider: string) {
    this.sent.labels(campaign_id, provider).inc();
  }
  markFailed(campaign_id: string, provider: string, reason: string) {
    this.failed.labels(campaign_id, provider, reason).inc();
  }
  markBounced(campaign_id: string, provider: string, type: 'hard' | 'soft') {
    this.bounced.labels(campaign_id, provider, type).inc();
  }
  observeProcess(queue: string, seconds: number) {
    this.procHist.labels(queue).observe(seconds);
  }
  setQueueSize(queue: string, size: number) {
    this.queueSize.labels(queue).set(size);
  }
  observeProvider(provider: string, op: string, seconds: number) {
    this.providerHist.labels(provider, op).observe(seconds);
  }
  beat(instance: string) {
    this.heartbeat.labels(instance).set(1);
  }
}
