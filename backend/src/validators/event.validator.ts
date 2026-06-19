import { z } from "zod";

const ClickDataSchema = z.object({
  x: z.number(),
  y: z.number(),
});

const MetadataSchema = z.object({
  screenWidth: z.number(),
  screenHeight: z.number(),
  viewportWidth: z.number(),
  viewportHeight: z.number(),
  userAgent: z.string(),
});

export const EventSchema = z.object({
  eventId: z.string().uuid(),

  sessionId: z.string().min(1),

  eventType: z.string().min(1),

  pageUrl: z.string().min(1),

  timestamp: z.string(),

  clickData: ClickDataSchema.optional(),

  customData: z.record(z.any()).optional(),

  metadata: MetadataSchema.optional(),
});

export const BulkEventSchema = z.object({
  events: z.array(EventSchema).min(1),
});

export type EventInput = z.infer<typeof EventSchema>;
