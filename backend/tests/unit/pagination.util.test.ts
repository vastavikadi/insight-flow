import { getPagination } from "../../src/utils/pagination";

describe("getPagination", () => {
  it("returns defaults", () => {
    const result = getPagination();

    expect(result.page).toBe(1);

    expect(result.limit).toBe(20);
  });

  it("parses values", () => {
    const result = getPagination("2", "50");

    expect(result.page).toBe(2);

    expect(result.limit).toBe(50);
  });
});
