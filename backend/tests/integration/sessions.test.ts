import request from "supertest";

import app from "../../src/app";

import EventModel from "../../src/models/Event";

describe("Sessions API", () => {
  beforeEach(async () => {
    await EventModel.deleteMany({});

    await EventModel.insertMany([
      {
        eventId: "1",

        sessionId: "session-1",

        eventType: "page_view",

        pageUrl: "/",

        timestamp: new Date("2026-01-01T10:00:00Z"),

        metadata: {
          screenWidth: 1920,
          screenHeight: 1080,
          viewportWidth: 1920,
          viewportHeight: 900,
          userAgent: "jest",
        },
      },

      {
        eventId: "2",

        sessionId: "session-1",

        eventType: "click",

        pageUrl: "/products",

        timestamp: new Date("2026-01-01T10:01:00Z"),

        clickData: {
          x: 120,
          y: 300,
        },

        metadata: {
          screenWidth: 1920,
          screenHeight: 1080,
          viewportWidth: 1920,
          viewportHeight: 900,
          userAgent: "jest",
        },
      },

      {
        eventId: "3",

        sessionId: "session-1",

        eventType: "product_opened",

        pageUrl: "/products",

        timestamp: new Date("2026-01-01T10:02:00Z"),

        customData: {
          productId: "vision-pro",
        },

        metadata: {
          screenWidth: 1920,
          screenHeight: 1080,
          viewportWidth: 1920,
          viewportHeight: 900,
          userAgent: "jest",
        },
      },
    ]);
  });

  describe("GET /api/sessions/:sessionId", () => {
    it("returns session journey", async () => {
      const response = await request(app).get("/api/sessions/session-1");

      expect(response.status).toBe(200);

      expect(response.body.success).toBe(true);

      expect(response.body.data.events.length).toBe(3);
    });

    it("returns events sorted by timestamp ascending", async () => {
      const response = await request(app).get("/api/sessions/session-1");

      const events = response.body.data.events;

      expect(events[0].eventId).toBe("1");

      expect(events[1].eventId).toBe("2");

      expect(events[2].eventId).toBe("3");
    });

    it("returns click coordinates", async () => {
      const response = await request(app).get("/api/sessions/session-1");

      const clickEvent = response.body.data.events.find(
        (event: any) => event.eventType === "click",
      );

      expect(clickEvent.clickData.x).toBe(120);

      expect(clickEvent.clickData.y).toBe(300);
    });

    it("returns custom data", async () => {
      const response = await request(app).get("/api/sessions/session-1");

      const productEvent = response.body.data.events.find(
        (event: any) => event.eventType === "product_opened",
      );

      expect(productEvent.customData.productId).toBe("vision-pro");
    });

    it("returns empty array for missing session", async () => {
      const response = await request(app).get("/api/sessions/does-not-exist");

      expect(response.status).toBe(200);

      expect(response.body.data.events).toHaveLength(0);
    });
  });
});
