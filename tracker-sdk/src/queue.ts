import type { AnalyticsEvent } from "./types";
import type { Logger } from "./logger";
import { STORAGE_KEYS } from "./constants";

import { Transport } from "./transport";

export class EventQueue {
  private queue: AnalyticsEvent[] = [];

  private isFlushing = false;

  constructor(
    private transport: Transport,

    private batchSize: number,

    private logger: Logger,
  ) {
    this.loadPersistedQueue();
  }

  private loadPersistedQueue() {
    const raw = localStorage.getItem(STORAGE_KEYS.PENDING_QUEUE);

    if (!raw) {
      return;
    }

    try {
      this.queue = JSON.parse(raw);

      if (this.queue.length > 0) {
        this.logger.log(`[InsightFlow] Restored ${this.queue.length} pending events`);
      }
    } catch {
      this.queue = [];
    }
  }

  private persistQueue() {
    localStorage.setItem(
      STORAGE_KEYS.PENDING_QUEUE,
      JSON.stringify(this.queue),
    );
  }

  enqueue(event: AnalyticsEvent) {
    this.queue.push(event);

    this.persistQueue();

    this.logger.log(`[InsightFlow] Queued event: ${event.eventType}`);

    if (this.queue.length >= this.batchSize) {
      void this.flush();
    }
  }

  async flush() {
    if (this.isFlushing) {
      return;
    }

    if (this.queue.length === 0) {
      return;
    }

    this.isFlushing = true;

    const batch = this.queue.slice();

    this.logger.log(`[InsightFlow] Flushing ${batch.length} events`);

    const success = await this.transport.send(batch);

    if (success) {
      this.queue = this.queue.filter(
        (queued) => !batch.some((sent) => sent.eventId === queued.eventId),
      );

      this.persistQueue();

      this.logger.log(
        `[InsightFlow] Flush completed successfully`,
      );
    } else {
      this.logger.warn(
        `[InsightFlow] Flush failed. Events retained in queue`,
      );
    }

    this.isFlushing = false;
  }

  getPendingEvents() {
    return [...this.queue];
  }

  getQueueSize() {
    return this.queue.length;
  }

  clear() {
    this.queue = [];

    this.persistQueue();

    this.logger.log(`[InsightFlow] Queue cleared`);
  }
}
