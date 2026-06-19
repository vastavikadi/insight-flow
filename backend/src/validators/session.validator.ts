import { z } from "zod";

export const SessionQuerySchema = z.object({
  page: z.string().optional(),

  limit: z.string().optional(),

  search: z.string().optional(),

  sortBy: z.enum(["lastSeen", "firstSeen", "totalEvents"]).optional(),

  sortOrder: z.enum(["asc", "desc"]).optional(),
});
