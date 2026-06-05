export interface ShiftLeftMetrics {
  carbonIntensity: number;
  resourceEfficiency: number;
  unusedInfrastructure: number;
  storageOptimization: number;
  ec2Usage: number;
  storageUsage: number;
  carbonGrowth: number;
  monthlyCloudCost: number;
  monthlyCarbonEmission: number;
}

export interface ShiftLeftFinding {
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  impact: string;
  affected_resources: string[];
}

export interface ShiftLeftRecommendation {
  id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  savings: string;
  carbonReduction: string;
  scoreIncrease: number;
  implementationDifficulty: "Easy" | "Medium" | "Hard";
  estimatedTimeToImplement: string;
  riskLevel: "Low" | "Medium" | "High";
}

export interface ShiftLeftScore {
  score: string;
  value: number;
  breakdown: {
    carbonIntensity: number;
    resourceEfficiency: number;
    unusedInfrastructure: number;
    storageOptimization: number;
  };
}

export interface ShiftLeftRisk {
  risk: "Low Risk" | "Medium Risk" | "High Risk" | "Critical Risk";
  riskLevel: number;
  color: string;
  description: string;
}

export interface ShiftLeftProjection {
  projectedScore: string;
  projectedValue: number;
  projectedCarbonReduction: string;
  projectedSavings: string;
  projectedCostSavingsPercentage: number;
  projectedCarbonReductionPercentage: number;
  improvementPotential: number;
}

export interface ShiftLeftAnalysis {
  score: ShiftLeftScore;
  risk: ShiftLeftRisk;
  findings: ShiftLeftFinding[];
  recommendations: ShiftLeftRecommendation[];
  projection: ShiftLeftProjection;
  executiveSummary: {
    currentStatus: string;
    keyFindings: string[];
    immediateActions: string[];
    expectedOutcome: string;
  };
}

export interface ShiftLeftRequest {
  metrics: ShiftLeftMetrics;
}

export interface ShiftLeftResponse extends ShiftLeftAnalysis {
  timestamp: string;
  analysisDuration: number;
}
