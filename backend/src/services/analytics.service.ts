import EventModel from "../models/Event.js";

import { EventRepository } from "../repositories/event.repository.js";
import { SessionQuery } from "../types/session-query.js";

export class AnalyticsService {
  static async getSessions(query: SessionQuery) {
    const result = await EventRepository.aggregateSessions(query);
    const total = result.metadata[0]?.total || 0;
    return { sessions: result.sessions, total };
  }

  static async getOverview() {
    const [totalEvents, uniqueSessions, pageStats] = await Promise.all([
      EventModel.countDocuments(),

      EventModel.distinct("sessionId"),

      EventModel.aggregate([
        {
          $group: {
            _id: "$pageUrl",

            count: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            count: -1,
          },
        },

        {
          $limit: 1,
        },
      ]),
    ]);

    return {
      totalEvents,

      totalSessions: uniqueSessions.length,

      avgEventsPerSession: uniqueSessions.length
        ? (totalEvents / uniqueSessions.length).toFixed(2)
        : 0,

      mostVisitedPage: pageStats[0]?._id || null,
    };
  }

  static async getPageAnalytics() {
    return EventModel.aggregate([
      {
        $group: {
          _id: "$pageUrl",

          totalEvents: {
            $sum: 1,
          },

          pageViews: {
            $sum: {
              $cond: [
                {
                  $eq: ["$eventType", "page_view"],
                },
                1,
                0,
              ],
            },
          },

          clicks: {
            $sum: {
              $cond: [
                {
                  $eq: ["$eventType", "click"],
                },
                1,
                0,
              ],
            },
          },
        },
      },

      {
        $sort: {
          totalEvents: -1,
        },
      },
    ]);
  }
}
