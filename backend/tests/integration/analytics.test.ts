import request from "supertest";
import app from "../../src/app";
describe("GET /api/analytics/overview", () => {
  it("returns overview", async () => {
    const response = await request(app).get("/api/analytics/overview");

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data).toHaveProperty("totalEvents");
  });
});
