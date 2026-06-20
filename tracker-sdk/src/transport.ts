import type { AnalyticsEvent } from "./types";

export class Transport {
  constructor(
    private readonly apiUrl: string,
    private readonly logger: {
      log: (...args: unknown[]) => void;
      warn: (...args: unknown[]) => void;
      error: (...args: unknown[]) => void;
    },
  ) {}

  async send(events: AnalyticsEvent[]): Promise<boolean> {
    const maxRetries = 3;

    let delay = 1000;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        this.logger.log(
          `Sending batch (${events.length} events) | Attempt ${attempt}/${maxRetries}`,
        );
        const response = await fetch(this.apiUrl, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            events,
          }),
        });

        if (response.ok) {
          this.logger.log(`[InsightFlow] Batch sent successfully`);

          return true;
        }
        if (response.status >= 400 && response.status < 500) {
          this.logger.error(
            `[InsightFlow] Client error (${response.status}), not retrying`,
          );

          return false;
        }

        this.logger.warn(
          `[InsightFlow] Server responded with ${response.status}`,
        );
      } catch (error) {
        this.logger.error(`[InsightFlow] Request failed`, error);
      }
      if (attempt < maxRetries) {
        this.logger.log(`[InsightFlow] Retrying in ${delay}ms`);

        await new Promise((resolve) => setTimeout(resolve, delay));

        delay *= 2;
      }
    }

    this.logger.error(
      `[InsightFlow] Max retries exceeded. Batch discarded from transport layer.`,
    );

    return false;
  }
}
