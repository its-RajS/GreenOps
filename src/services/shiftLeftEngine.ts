import {
  ShiftLeftMetrics,
  ShiftLeftScore,
  ShiftLeftRisk,
  ShiftLeftFinding,
  ShiftLeftRecommendation,
  ShiftLeftProjection,
  ShiftLeftAnalysis,
} from "@/types/shiftLeft";
import { shiftLeftRules, improvementActions } from "@/data/shiftLeftData";

/**
 * Calculate Shift-Left Sustainability Score
 * Formula: (carbonIntensity × 0.3) + (resourceEfficiency × 0.3) + (unusedInfrastructure × 0.2) + (storageOptimization × 0.2)
 */
export function calculateShiftLeftScore(metrics: ShiftLeftMetrics): ShiftLeftScore {
  const weightedScore =
    metrics.carbonIntensity * 0.3 +
    metrics.resourceEfficiency * 0.3 +
    metrics.unusedInfrastructure * 0.2 +
    metrics.storageOptimization * 0.2;

  const score = Math.round(weightedScore);

  let gradeScore: string;
  if (score >= 90) gradeScore = "A";
  else if (score >= 80) gradeScore = "B";
  else if (score >= 70) gradeScore = "C";
  else if (score >= 60) gradeScore = "D";
  else gradeScore = "F";

  return {
    score: gradeScore,
    value: score,
    breakdown: {
      carbonIntensity: metrics.carbonIntensity,
      resourceEfficiency: metrics.resourceEfficiency,
      unusedInfrastructure: metrics.unusedInfrastructure,
      storageOptimization: metrics.storageOptimization,
    },
  };
}

/**
 * Assess sustainability risk level based on score
 */
export function assessRisk(scoreValue: number): ShiftLeftRisk {
  let riskLevel: string;
  let riskNumber: number;
  let color: string;
  let description: string;

  if (scoreValue >= 90) {
    riskLevel = "Low Risk";
    riskNumber = 10;
    color = "#10b981";
    description = "Excellent sustainability practices. Minimal environmental risk.";
  } else if (scoreValue >= 80) {
    riskLevel = "Low Risk";
    riskNumber = 25;
    color = "#22c55e";
    description = "Strong sustainability posture. Minor optimization opportunities.";
  } else if (scoreValue >= 70) {
    riskLevel = "Medium Risk";
    riskNumber = 50;
    color = "#f59e0b";
    description = "Moderate sustainability concerns. Significant improvement potential.";
  } else if (scoreValue >= 60) {
    riskLevel = "High Risk";
    riskNumber = 75;
    color = "#f97316";
    description = "Substantial sustainability challenges. Urgent action recommended.";
  } else {
    riskLevel = "Critical Risk";
    riskNumber = 95;
    color = "#ef4444";
    description = "Critical sustainability issues. Immediate intervention required.";
  }

  return {
    risk: riskLevel as "Low Risk" | "Medium Risk" | "High Risk" | "Critical Risk",
    riskLevel: riskNumber,
    color,
    description,
  };
}

/**
 * Generate sustainability findings based on metrics
 */
export function generateFindings(metrics: ShiftLeftMetrics): ShiftLeftFinding[] {
  const findings: ShiftLeftFinding[] = [];

  // EC2 Usage Finding
  if (metrics.ec2Usage > shiftLeftRules.ec2HighUsageThreshold) {
    findings.push({
      severity: "high",
      title: "High EC2 Resource Utilization",
      description: `EC2 instances are operating at ${metrics.ec2Usage}% utilization, indicating either overprovisioning or inefficient instance sizing.`,
      impact: `12 Kg CO₂ per month`,
      affected_resources: ["EC2", "Compute"],
    });
  }

  // Storage Usage Finding
  if (metrics.storageUsage > shiftLeftRules.storageHighUsageThreshold) {
    findings.push({
      severity: "medium",
      title: "Cold Storage Archive Opportunity",
      description: `${metrics.storageUsage}% of storage is in active tiers. Significant data may be suitable for cheaper archive storage.`,
      impact: `8 Kg CO₂ per month`,
      affected_resources: ["Storage", "S3"],
    });
  }

  // Carbon Growth Finding
  if (metrics.carbonGrowth > shiftLeftRules.carbonGrowthThreshold) {
    findings.push({
      severity: "high",
      title: "Accelerating Carbon Emissions",
      description: `Carbon emissions are increasing by ${metrics.carbonGrowth}% month-over-month, exceeding sustainable growth benchmarks.`,
      impact: `Unsustainable trajectory`,
      affected_resources: ["Overall Infrastructure"],
    });
  }

  // Resource Efficiency Finding
  if (metrics.resourceEfficiency < 70) {
    findings.push({
      severity: "high",
      title: "Low Resource Efficiency",
      description: `Resource efficiency score of ${metrics.resourceEfficiency}% indicates significant wasted computing resources.`,
      impact: `Multiple resources underutilized`,
      affected_resources: ["Compute", "Memory", "Storage"],
    });
  }

  // Unused Infrastructure Finding
  if (metrics.unusedInfrastructure < 65) {
    findings.push({
      severity: "critical",
      title: "Significant Unused Infrastructure",
      description: `${100 - metrics.unusedInfrastructure}% of infrastructure resources are not actively used, leading to wasted spending and emissions.`,
      impact: `Direct carbon waste`,
      affected_resources: ["All Resource Types"],
    });
  }

  // Storage Optimization Finding
  if (metrics.storageOptimization < 60) {
    findings.push({
      severity: "medium",
      title: "Storage Optimization Opportunity",
      description: `Storage optimization score of ${metrics.storageOptimization}% suggests data redundancy and inefficient storage configurations.`,
      impact: `Unnecessary storage costs`,
      affected_resources: ["Storage", "Databases"],
    });
  }

  // Carbon Intensity Finding
  if (metrics.carbonIntensity < 60) {
    findings.push({
      severity: "high",
      title: "High Carbon Intensity",
      description: `Carbon intensity score of ${metrics.carbonIntensity}% indicates infrastructure is in regions with high carbon footprint or inefficient operations.`,
      impact: `Regional carbon emissions`,
      affected_resources: ["Infrastructure", "Regions"],
    });
  }

  return findings;
}

/**
 * Generate actionable recommendations based on metrics
 */
export function generateRecommendations(metrics: ShiftLeftMetrics): ShiftLeftRecommendation[] {
  const recommendations: ShiftLeftRecommendation[] = [];

  // Recommendation 1: Downsize EC2
  if (metrics.ec2Usage > shiftLeftRules.ec2HighUsageThreshold) {
    recommendations.push({
      id: "rec-ec2-downsize",
      title: "Downsize Idle EC2 Instances",
      description:
        "Analysis shows multiple EC2 instances operating below optimal utilization. Downsize or consolidate instances to match actual workload requirements.",
      priority: "High",
      savings: improvementActions.downsizeEc2.savings,
      carbonReduction: improvementActions.downsizeEc2.carbonReduction,
      scoreIncrease: improvementActions.downsizeEc2.scoreIncrease,
      implementationDifficulty: "Easy",
      estimatedTimeToImplement: "1-2 weeks",
      riskLevel: "Low",
    });
  }

  // Recommendation 2: Archive Cold Storage
  if (metrics.storageUsage > shiftLeftRules.storageHighUsageThreshold) {
    recommendations.push({
      id: "rec-storage-archive",
      title: "Archive Cold Storage Data",
      description:
        "Move data not accessed in 90+ days to S3 Glacier or equivalent archive tier. Significantly reduces storage costs and carbon footprint.",
      priority: "Medium",
      savings: improvementActions.archiveStorage.savings,
      carbonReduction: improvementActions.archiveStorage.carbonReduction,
      scoreIncrease: improvementActions.archiveStorage.scoreIncrease,
      implementationDifficulty: "Medium",
      estimatedTimeToImplement: "2-3 weeks",
      riskLevel: "Low",
    });
  }

  // Recommendation 3: Switch to Green Region
  if (metrics.carbonGrowth > shiftLeftRules.carbonGrowthThreshold) {
    recommendations.push({
      id: "rec-region-switch",
      title: "Migrate to Lower Carbon Region",
      description:
        "Move workloads to cloud regions powered by renewable energy. Significant carbon footprint reduction without operational changes.",
      priority: "High",
      savings: improvementActions.switchRegion.savings,
      carbonReduction: improvementActions.switchRegion.carbonReduction,
      scoreIncrease: improvementActions.switchRegion.scoreIncrease,
      implementationDifficulty: "Hard",
      estimatedTimeToImplement: "4-8 weeks",
      riskLevel: "Medium",
    });
  }

  // Recommendation 4: Database Optimization (always suggested if score < 85)
  if (metrics.carbonIntensity + metrics.resourceEfficiency + metrics.storageOptimization < 240) {
    recommendations.push({
      id: "rec-db-optimize",
      title: "Optimize Database Connections & Queries",
      description:
        "Implement connection pooling, query optimization, and indexing strategies to reduce database resource consumption.",
      priority: "Medium",
      savings: improvementActions.optimizeDatabase.savings,
      carbonReduction: improvementActions.optimizeDatabase.carbonReduction,
      scoreIncrease: improvementActions.optimizeDatabase.scoreIncrease,
      implementationDifficulty: "Medium",
      estimatedTimeToImplement: "2-4 weeks",
      riskLevel: "Low",
    });
  }

  return recommendations;
}

/**
 * Calculate projected improvements if all recommendations are implemented
 */
export function calculateProjection(
  currentScore: number,
  recommendations: ShiftLeftRecommendation[],
  currentMetrics: ShiftLeftMetrics
): ShiftLeftProjection {
  const totalScoreIncrease = recommendations.reduce((sum, rec) => sum + rec.scoreIncrease, 0);
  const projectedScoreValue = Math.min(100, currentScore + totalScoreIncrease);

  let projectedGrade: string;
  if (projectedScoreValue >= 90) projectedGrade = "A";
  else if (projectedScoreValue >= 80) projectedGrade = "B";
  else if (projectedScoreValue >= 70) projectedGrade = "C";
  else if (projectedScoreValue >= 60) projectedGrade = "D";
  else projectedGrade = "F";

  // Calculate projected carbon reduction
  let totalCarbonReductionPercentage = 0;
  recommendations.forEach((rec) => {
    if (rec.carbonReduction.includes("%")) {
      const percentage = parseInt(rec.carbonReduction);
      totalCarbonReductionPercentage += percentage;
    }
  });

  const projectedCarbonEmission = Math.max(
    0,
    currentMetrics.monthlyCarbonEmission * (1 - totalCarbonReductionPercentage / 100)
  );

  const projectedCarbonReduction = (
    ((currentMetrics.monthlyCarbonEmission - projectedCarbonEmission) /
      currentMetrics.monthlyCarbonEmission) *
    100
  ).toFixed(1);

  // Calculate total savings
  let totalSavings = 0;
  recommendations.forEach((rec) => {
    const savingsMatch = rec.savings.match(/₹(\d+)/);
    if (savingsMatch) {
      totalSavings += parseInt(savingsMatch[1]);
    }
  });

  const projectedSavingsPercentage = (
    ((totalSavings / currentMetrics.monthlyCloudCost) * 100)
  ).toFixed(1);

  return {
    projectedScore: projectedGrade,
    projectedValue: projectedScoreValue,
    projectedCarbonReduction: `${projectedCarbonReduction}%`,
    projectedSavings: `₹${totalSavings}/month`,
    projectedCostSavingsPercentage: parseFloat(projectedSavingsPercentage),
    projectedCarbonReductionPercentage: totalCarbonReductionPercentage,
    improvementPotential: totalScoreIncrease,
  };
}

/**
 * Generate executive summary of the analysis
 */
export function generateExecutiveSummary(
  score: string,
  risk: string,
  findings: ShiftLeftFinding[],
  recommendations: ShiftLeftRecommendation[],
  projection: ShiftLeftProjection
): { currentStatus: string; keyFindings: string[]; immediateActions: string[]; expectedOutcome: string } {
  const statusMap: Record<string, string> = {
    A: "Excellent sustainability posture with minimal intervention required",
    B: "Strong sustainability performance with opportunities for optimization",
    C: "Adequate sustainability practices with significant improvement potential",
    D: "Concerning sustainability metrics requiring urgent optimization",
    F: "Critical sustainability situation demanding immediate action",
  };

  const keyFindings = findings.slice(0, 3).map((f) => f.title);

  const immediateActions = recommendations
    .filter((r) => r.priority === "High")
    .slice(0, 3)
    .map((r) => r.title);

  const improvementText =
    projection.improvementPotential > 0
      ? `from ${score} to ${projection.projectedScore}`
      : "no additional improvement possible";

  return {
    currentStatus: statusMap[score] || "Unknown status",
    keyFindings,
    immediateActions: immediateActions.length > 0 ? immediateActions : ["Review and implement medium-priority recommendations"],
    expectedOutcome: `Implementing all recommendations can improve sustainability score ${improvementText} and reduce carbon emissions by ${projection.projectedCarbonReduction}.`,
  };
}

/**
 * Main Shift-Left Analysis Engine
 */
export function analyzeShiftLeft(metrics: ShiftLeftMetrics): ShiftLeftAnalysis {
  const score = calculateShiftLeftScore(metrics);
  const risk = assessRisk(score.value);
  const findings = generateFindings(metrics);
  const recommendations = generateRecommendations(metrics);
  const projection = calculateProjection(score.value, recommendations, metrics);
  const executiveSummary = generateExecutiveSummary(
    score.score,
    risk.risk,
    findings,
    recommendations,
    projection
  );

  return {
    score,
    risk,
    findings,
    recommendations,
    projection,
    executiveSummary,
  };
}
