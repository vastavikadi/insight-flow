import type { AnalyticsEvent, TrackerConfig } from "./types";
import { Logger } from "./logger";
import { DEFAULTS } from "./constants";
import { SessionManager } from "./session";
import { Transport } from "./transport";
import { EventQueue } from "./queue";

export class InsightFlow {
  private sessionManager: SessionManager;

  private queue: EventQueue;

  private config: Required<TrackerConfig>;

  private initialized = false;

  private flushTimer?: number;

  private routeObserver?: MutationObserver;

  private currentPath: string = "";

  private logger!: Logger;

  constructor(config: TrackerConfig) {
    this.config = {
      flushInterval: DEFAULTS.FLUSH_INTERVAL,
      batchSize: DEFAULTS.BATCH_SIZE,
      debug: false,
      ...config,
    };

    this.sessionManager = new SessionManager();

    this.logger = new Logger(this.config.debug);
    const transport = new Transport(this.config.apiUrl, this.logger);

    this.queue = new EventQueue(transport, this.config.batchSize, this.logger);
  }

  public init() {
    if (typeof window === "undefined") {
      return;
    }
    if (this.initialized) {
      return;
    }

    this.currentPath = window.location.pathname;
    this.initialized = true;

    this.trackPageView();

    this.registerUnloadListener();

    this.registerVisibilityListener();

    this.monitorRouteChanges();

    document.addEventListener("click", this.handleClick);

    this.flushTimer = window.setInterval(() => {
      void this.flush();
    }, this.config.flushInterval);

    this.logger.log("[InsightFlow] Initialized");
  }

  private buildMetadata() {
    return {
      screenWidth: screen.width,

      screenHeight: screen.height,

      viewportWidth: window.innerWidth,

      viewportHeight: window.innerHeight,

      userAgent: navigator.userAgent,
    };
  }

  private createEvent(
    eventType: string,

    clickData?: {
      x: number;
      y: number;
    },
  ): AnalyticsEvent {
    return {
      eventId: crypto.randomUUID(),

      sessionId: this.sessionManager.getSessionId(),

      eventType,

      pageUrl: window.location.pathname,

      timestamp: new Date().toISOString(),

      clickData,

      metadata: this.buildMetadata(),
    };
  }

  private trackEvent(
    eventType: string,

    options?: {
      clickData?: {
        x: number;
        y: number;
      };

      customData?: Record<string, unknown>;
    },
  ) {
    const event = this.createEvent(eventType, options?.clickData);

    if (options?.customData) {
      event.customData = options.customData;
    }

    this.queue.enqueue(event);

    this.logger.log("[InsightFlow] Tracked:", eventType, event);
  }

  public trackPageView() {
    this.trackEvent("page_view");
  }

  public trackClick(x: number, y: number) {
    this.trackEvent("click", {
      clickData: {
        x,
        y,
      },
    });
  }

  public track(
    eventType: string,

    customData?: Record<string, unknown>,
  ) {
    this.trackEvent(eventType, {
      customData,
    });
  }

  private registerUnloadListener() {
    window.addEventListener("beforeunload", () => {
      const events = this.queue.getPendingEvents();

      if (events.length === 0) {
        return;
      }

      navigator.sendBeacon(
        this.config.apiUrl,
        JSON.stringify({
          events,
        }),
      );
    });
  }

  private registerVisibilityListener() {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        void this.flush();
      }
    });
  }

  private monitorRouteChanges() {
    this.routeObserver = new MutationObserver(() => {
      const newPath = window.location.pathname;

      if (newPath === this.currentPath) {
        return;
      }

      this.currentPath = newPath;

      this.trackPageView();
    });

    this.routeObserver.observe(document, {
      subtree: true,
      childList: true,
    });
  }

  private handleClick = (event: MouseEvent) => {
    this.trackClick(event.clientX, event.clientY);
  };

  public async flush() {
    await this.queue.flush();
  }

  public async destroy() {
    await this.flush();

    document.removeEventListener("click", this.handleClick);

    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }

    if (this.routeObserver) {
      this.routeObserver.disconnect();
    }

    this.initialized = false;

    this.logger.log("[InsightFlow] Destroyed");
  }
}
