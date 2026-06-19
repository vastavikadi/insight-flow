export type EventType = string;

export interface ClickData {
  x: number;
  y: number;
}

export interface EventMetadata {
  screenWidth: number;
  screenHeight: number;

  viewportWidth: number;
  viewportHeight: number;

  userAgent: string;
}

export interface AnalyticsEvent {
  eventId: string;

  sessionId: string;

  eventType: string;

  pageUrl: string;

  timestamp: string;

  clickData?: ClickData;

  customData?: Record<string, unknown>;

  metadata: EventMetadata;
}

export interface TrackerConfig {
  apiUrl: string;

  flushInterval?: number;

  batchSize?: number;

  debug?: boolean;
}
