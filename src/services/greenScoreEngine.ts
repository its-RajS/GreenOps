import { GreenScore } from "@/types";

export function calculateGreenScore(
  carbonIntensity: number,
  resourceEfficiency: number,
  unusedInfrastructure: number,
  storageOptimization: number
): GreenScore {
  const average = (carbonIntensity + resourceEfficiency + unusedInfrastructure + storageOptimization) / 4;

  let score: string;
  if (average >= 90) score = "A";
  else if (average >= 80) score = "B";
  else if (average >= 70) score = "C";
  else if (average >= 60) score = "D";
  else score = "F";

  return {
    score,
    scoreValue: Math.round(average),
    carbonIntensity: Math.round(carbonIntensity),
    resourceEfficiency: Math.round(resourceEfficiency),
    unusedInfrastructure: Math.round(unusedInfrastructure),
    storageOptimization: Math.round(storageOptimization),
  };
}

export function getScoreDescription(score: string): string {
  const descriptions: Record<string, string> = {
    A: "Excellent - Outstanding sustainability performance",
    B: "Good - Strong sustainability practices in place",
    C: "Average - Room for improvement in sustainability",
    D: "Poor - Significant sustainability concerns",
    F: "Critical - Urgent action needed for sustainability",
  };
  return descriptions[score] || "Unknown";
}
