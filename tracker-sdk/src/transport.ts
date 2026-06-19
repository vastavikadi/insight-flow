import type { AnalyticsEvent } from "./types";

export class Transport {
  constructor(
    private apiUrl: string,
    private debug = false,
  ) {}

  async send(events: AnalyticsEvent[]): Promise<boolean> {
    const maxRetries = 3;

    let delay = 1000;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        if (this.debug) {
          console.log(
            `[InsightFlow] Sending batch (${events.length} events) | Attempt ${attempt}/${maxRetries}`,
          );
        }
        console.log("PAYLOAD", JSON.stringify({ events }, null, 2));
        const response = await fetch(this.apiUrl, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            events,
          }),
        });
        console.log(await response.text());

        if (response.ok) {
          if (this.debug) {
            console.log(`[InsightFlow] Batch sent successfully`);
          }

          return true;
        }
        if (response.status >= 400 && response.status < 500) {
          if (this.debug) {
            console.error(
              `[InsightFlow] Client error (${response.status}), not retrying`,
            );
          }

          return false;
        }
        if (this.debug) {
          console.warn(
            `[InsightFlow] Server responded with ${response.status}`,
          );
        }
      } catch (error) {
        if (this.debug) {
          console.error(`[InsightFlow] Request failed`, error);
        }
      }
      if (attempt < maxRetries) {
        if (this.debug) {
          console.log(`[InsightFlow] Retrying in ${delay}ms`);
        }

        await new Promise((resolve) => setTimeout(resolve, delay));

        delay *= 2;
      }
    }
    if (this.debug) {
      console.error(
        `[InsightFlow] Max retries exceeded. Batch discarded from transport layer.`,
      );
    }
    return false;
  }
}
