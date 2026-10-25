// Risk score → severity band. A higher score means more risk, so the ring colour
// follows the same scale as the finding severities: high / medium / low.
export type RiskBandName = "Elevated" | "Moderate" | "Low";

export interface RiskBand {
  name: RiskBandName;
  /** Stroke utility for the progress ring. */
  stroke: string;
  /** Background utility for the small status dot. */
  dot: string;
}

const BANDS: Record<RiskBandName, RiskBand> = {
  Elevated: { name: "Elevated", stroke: "stroke-severity-high", dot: "bg-severity-high" },
  Moderate: { name: "Moderate", stroke: "stroke-severity-medium", dot: "bg-severity-medium" },
  Low: { name: "Low", stroke: "stroke-severity-low", dot: "bg-severity-low" },
};

export function riskBand(score: number): RiskBand {
  if (score >= 70) return BANDS.Elevated;
  if (score >= 40) return BANDS.Moderate;
  return BANDS.Low;
}
