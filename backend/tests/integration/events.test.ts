import request from "supertest";
import app from "../../src/app";

describe("POST /api/events/bulk", () => {
  it("stores valid events", async () => {
    const response = await request(app)
      .post("/api/events/bulk")
      .send({
        events: [
          {
            eventId: "1",

            sessionId: "s1",

            eventType: "page_view",

            pageUrl: "/",

            timestamp: new Date().toISOString(),

            metadata: {
              screenWidth: 1920,

              screenHeight: 1080,

              viewportWidth: 1920,

              viewportHeight: 900,

              userAgent: "jest",
            },
          },
        ],
      });

    expect(response.status).toBe(201);

    expect(response.body.success).toBe(true);
  });

  it("rejects invalid payload", async () => {
    const response = await request(app).post("/api/events/bulk").send({});

    expect(response.status).toBe(400);
  });

  it("accepts custom events", async () => {
    const response = await request(app)
      .post("/api/events/bulk")
      .send({
        events: [
          {
            eventId: "2",

            sessionId: "s1",

            eventType: "purchase_completed",

            pageUrl: "/checkout",

            timestamp: new Date().toISOString(),

            customData: {
              revenue: 100,
            },

            metadata: {
              screenWidth: 1920,

              screenHeight: 1080,

              viewportWidth: 1920,

              viewportHeight: 900,

              userAgent: "jest",
            },
          },
        ],
      });

    expect(response.status).toBe(201);
  });
});
