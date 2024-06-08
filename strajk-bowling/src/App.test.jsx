import { describe, it, expect } from "vitest";

describe("Boolean value assertions", () => {
  it("should confirm that true equals true", () => {
    expect(true).toBe(true);
  });

  it("should confirm that false equals false", () => {
    expect(false).toBe(false);
  });
});
