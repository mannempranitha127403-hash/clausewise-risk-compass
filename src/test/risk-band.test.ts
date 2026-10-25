import { describe, expect, it } from "vitest";

import { riskBand } from "@/components/clausewise/risk";

describe("riskBand", () => {
  it("marks the demo score of 72 as Elevated with the high-risk ring colour", () => {
    expect(riskBand(72)).toEqual({ name: "Elevated", stroke: "stroke-severity-high", dot: "bg-severity-high" });
  });

  it("uses the medium colour from 40 up to 70", () => {
    expect(riskBand(40).name).toBe("Moderate");
    expect(riskBand(69).stroke).toBe("stroke-severity-medium");
  });

  it("uses the low colour below 40", () => {
    expect(riskBand(39)).toEqual({ name: "Low", stroke: "stroke-severity-low", dot: "bg-severity-low" });
  });
});
