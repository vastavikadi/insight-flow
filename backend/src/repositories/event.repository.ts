import EventModel from "../models/Event";
import { SessionQuery } from "../types/session-query";

export class EventRepository {
  static async bulkUpsertEvents(events: any[]) {
    const operations = events.map((event) => ({
      updateOne: {
        filter: {
          eventId: event.eventId,
        },

        update: {
          $setOnInsert: event,
        },

        upsert: true,
      },
    }));

    const result = await EventModel.bulkWrite(operations, {
      ordered: false,
    });

    return {
      inserted: result.upsertedCount,

      matched: result.matchedCount,
    };
  }

  static async getSessionEvents(
    sessionId: string,
    skip: number,
    limit: number,
  ) {
    const [events, total] = await Promise.all([
      EventModel.find({
        sessionId,
      })
        .sort({
          timestamp: 1,
        })
        .skip(skip)
        .limit(limit),

      EventModel.countDocuments({
        sessionId,
      }),
    ]);

    return {
      events,
      total,
    };
  }

  static async getHeatmapData(pageUrl: string) {
    return EventModel.find({
      pageUrl,
      eventType: "click",
    })
      .select("clickData.x clickData.y")
      .lean();
  }

  static async aggregateSessions(query: SessionQuery) {
    const {
      page,
      limit,
      search,
      sortBy = "lastSeen",
      sortOrder = "desc",
    } = query;
    const skip = (page - 1) * limit;
    const sortDirection = sortOrder === "asc" ? 1 : -1;
    const sortStage: Record<string, 1 | -1> = {
      [sortBy]: sortDirection,
    };
    const aggregation: any[] = [
      {
        $group: {
          _id: "$sessionId",
          totalEvents: {
            $sum: 1,
          },
          firstSeen: {
            $min: "$timestamp",
          },
          lastSeen: {
            $max: "$timestamp",
          },
        },
      },

      ...(search
        ? [
            {
              $match: {
                _id: {
                  $regex: String(search),
                  $options: "i",
                },
              },
            },
          ]
        : []),

      {
        $facet: {
          metadata: [
            {
              $count: "total",
            },
          ],

          sessions: [
            {
              $sort: sortStage,
            },

            {
              $skip: skip,
            },

            {
              $limit: limit,
            },
          ],
        },
      },
    ];
    const result = await EventModel.aggregate(aggregation);

    return (
      result[0] ?? {
        metadata: [],
        sessions: [],
      }
    );
  }
}
