import EventModel from "../models/Event.js";

import { EventRepository } from "../repositories/event.repository.js";
import { SessionQuery } from "../types/session-query.js";
import { buildDateFilter }
from "../utils/dateFilter.js";

export class AnalyticsService {
  static async getSessions(query: SessionQuery) {
    const result = await EventRepository.aggregateSessions(query);
    const total = result.metadata[0]?.total || 0;
    return { sessions: result.sessions, total };
  }

  static async getOverview(startDate?: string, endDate?: string,) {
    const dateFilter =
  buildDateFilter(
    startDate,
    endDate,
  );
    const [totalEvents, uniqueSessions, pageStats, purchases, carts] = await Promise.all([
      EventModel.countDocuments(dateFilter),

      EventModel.distinct("sessionId", dateFilter),

      EventModel.aggregate([
        {
          $match: dateFilter,
        },
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

      EventModel.countDocuments({
    eventType:
      "purchase_completed",
  }),

      EventModel.countDocuments({
    eventType:
      "product_added_to_cart",
  })
    ]);

    return {
      totalEvents,

      totalSessions: uniqueSessions.length,

      avgEventsPerSession: uniqueSessions.length
        ? (totalEvents / uniqueSessions.length).toFixed(2)
        : 0,

      mostVisitedPage: pageStats[0]?._id || null,

      purchaseCount: purchases,
      cartAdds: carts,
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

  static async getEventDistribution() {
  return EventModel.aggregate([
    {
      $group: {
        _id: "$eventType",
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
  ]);
  }

  static async getConversionFunnel() {
  const eventTypes = [
    "product_opened",
    "wishlist_added",
    "product_added_to_cart",
    "checkout_started",
    "purchase_completed",
  ];

  const data =
    await EventModel.aggregate([
      {
        $match: {
          eventType: {
            $in: eventTypes,
          },
        },
      },

      {
        $group: {
          _id: "$eventType",

          count: {
            $sum: 1,
          },
        },
      },
    ]);

  return eventTypes.map(
    eventType => ({
      eventType,

      count:
        data.find(
          item =>
            item._id ===
            eventType,
        )?.count ?? 0,
    }),
  );
  }

  static async getTimeline(startDate?: string,
  endDate?: string,) {
  const dateFilter =
  buildDateFilter(
    startDate,
    endDate,
  );

  return EventModel.aggregate([
    {
      $match: dateFilter,
    },

    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$timestamp",
          },
        },

        totalEvents: {
          $sum: 1,
        },

        pageViews: {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$eventType",
                  "page_view",
                ],
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
                $eq: [
                  "$eventType",
                  "click",
                ],
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
        _id: 1,
      },
    },
  ]);
  }

  static async getProductAnalytics(startDate?: string,
  endDate?: string,) {
    const dateFilter =
  buildDateFilter(
    startDate,
    endDate,
  );
  return EventModel.aggregate([
    {
      $match: {
        ...dateFilter,
        eventType: {
          $in: [
            "product_opened",
            "wishlist_added",
            "product_added_to_cart",
          ],
        },

        "customData.productId": {
          $exists: true,
        },
      },
    },

    {
      $group: {
        _id: "$customData.productId",

        opened: {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$eventType",
                  "product_opened",
                ],
              },
              1,
              0,
            ],
          },
        },

        wishlisted: {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$eventType",
                  "wishlist_added",
                ],
              },
              1,
              0,
            ],
          },
        },

        carted: {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$eventType",
                  "product_added_to_cart",
                ],
              },
              1,
              0,
            ],
          },
        },
      },
    },

    {
      $project: {
        _id: 0,

        productId: "$_id",

        opened: 1,

        wishlisted: 1,

        carted: 1,
      },
    },

    {
      $sort: {
        opened: -1,
      },
    },
  ]);
  }

  static async getTopEvents(startDate?: string, endDate?: string) {
    const dateFilter =
  buildDateFilter(
    startDate,
    endDate,
  );
  return EventModel.aggregate([
    {
      $match: dateFilter,
    },
    {
      $group: {
        _id: "$eventType",

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
  ]);
  }
}
