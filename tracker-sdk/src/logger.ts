export class Logger {
  constructor(private readonly debug: boolean) {}

  log(...args: unknown[]) {
    if (!this.debug) {
      return;
    }

    console.log("[InsightFlow]", ...args);
  }

  warn(...args: unknown[]) {
    if (!this.debug) {
      return;
    }

    console.warn("[InsightFlow]", ...args);
  }

  error(...args: unknown[]) {
    if (!this.debug) {
      return;
    }

    console.error("[InsightFlow]", ...args);
  }
}
