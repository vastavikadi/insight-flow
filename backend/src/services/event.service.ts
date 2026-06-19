import { EventRepository } from "../repositories/event.repository.js";

export class EventService {
  static async ingestEvents(events: any[]) {
    return EventRepository.bulkUpsertEvents(events);
  }

  static async getSessionJourney(
    sessionId: string,
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;

    return EventRepository.getSessionEvents(sessionId, skip, limit);
  }

  static async getHeatmap(pageUrl: string) {
    return EventRepository.getHeatmapData(pageUrl);
  }
}
