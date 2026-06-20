import request from "supertest";

import app from "../../src/app";

import EventModel from "../../src/models/Event";

describe("GET /api/analytics/sessions", () => {
  beforeEach(async () => {
    await EventModel.deleteMany({});

    const events = [];

    for (let session = 1; session <= 25; session++) {
      for (let event = 1; event <= session; event++) {
        events.push({
          eventId: `event-${session}-${event}`,

          sessionId: `session-${session}`,

          eventType: "page_view",

          pageUrl: "/",

          timestamp: new Date(2026, 0, session, 10, event),

          metadata: {
            screenWidth: 1920,
            screenHeight: 1080,
            viewportWidth: 1920,
            viewportHeight: 900,
            userAgent: "jest",
          },
        });
      }
    }

    await EventModel.insertMany(events);
  });

  it("returns paginated sessions", async () => {
    const response = await request(app).get(
      "/api/analytics/sessions?page=1&limit=10",
    );

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data.length).toBe(10);

    expect(response.body.pagination.page).toBe(1);

    expect(response.body.pagination.limit).toBe(10);

    expect(response.body.pagination.total).toBe(25);

    expect(response.body.pagination.totalPages).toBe(3);
  });

  it("returns second page correctly", async () => {
    const response = await request(app).get(
      "/api/analytics/sessions?page=2&limit=10",
    );

    expect(response.status).toBe(200);

    expect(response.body.data.length).toBe(10);

    expect(response.body.pagination.page).toBe(2);
  });

  it("filters sessions by search", async () => {
    const response = await request(app).get(
      "/api/analytics/sessions?search=session-20",
    );

    expect(response.status).toBe(200);

    expect(response.body.data.length).toBe(1);

    expect(response.body.data[0]._id).toBe("session-20");
  });

  it("sorts by totalEvents descending", async () => {
    const response = await request(app).get(
      "/api/analytics/sessions?sortBy=totalEvents&sortOrder=desc",
    );

    expect(response.status).toBe(200);

    expect(response.body.data[0].totalEvents).toBe(25);
  });

  it("sorts by totalEvents ascending", async () => {
    const response = await request(app).get(
      "/api/analytics/sessions?sortBy=totalEvents&sortOrder=asc",
    );

    expect(response.status).toBe(200);

    expect(response.body.data[0].totalEvents).toBe(1);
  });

  it("sorts by firstSeen", async () => {
    const response = await request(app).get(
      "/api/analytics/sessions?sortBy=firstSeen&sortOrder=asc",
    );

    expect(response.status).toBe(200);

    expect(response.body.data[0]._id).toBe("session-1");
  });

  it("sorts by lastSeen", async () => {
    const response = await request(app).get(
      "/api/analytics/sessions?sortBy=lastSeen&sortOrder=desc",
    );

    expect(response.status).toBe(200);

    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it("returns empty result for unknown search", async () => {
    const response = await request(app).get(
      "/api/analytics/sessions?search=unknown-session",
    );

    expect(response.status).toBe(200);

    expect(response.body.data).toHaveLength(0);

    expect(response.body.pagination.total).toBe(0);
  });

  it("returns pagination metadata", async () => {
    const response = await request(app).get(
      "/api/analytics/sessions?page=1&limit=5",
    );

    expect(response.body.pagination).toEqual({
      page: 1,
      limit: 5,
      total: 25,
      totalPages: 5,
    });
  });
});
