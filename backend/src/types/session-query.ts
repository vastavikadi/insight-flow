export interface SessionQuery {
  page: number;
  limit: number;
  search?: string;
  sortBy?: "lastSeen" | "firstSeen" | "totalEvents";
  sortOrder?: "asc" | "desc";
}
