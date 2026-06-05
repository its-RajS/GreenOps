import { Recommendation } from "@/types";

export function generateRecommendations(
  ec2Usage: number,
  storageUsage: number,
  carbonGrowth: number
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  if (ec2Usage > 80) {
    recommendations.push({
      id: "rec-ec2",
      title: "Downsize Idle EC2 Instances",
      description: "Multiple instances show low utilization below 15%. Consider downsizing or terminating them.",
      impact: "High",
      savings: "₹500/month",
      carbonReduction: "12 Kg CO₂",
      priority: "High",
    });
  }

  if (storageUsage > 60) {
    recommendations.push({
      id: "rec-storage",
      title: "Archive Cold Storage",
      description: "Move inactive storage to archive tiers. Data not accessed in 90 days can be archived.",
      impact: "Medium",
      savings: "₹300/month",
      carbonReduction: "8 Kg CO₂",
      priority: "Medium",
    });
  }

  if (carbonGrowth > 10) {
    recommendations.push({
      id: "rec-region",
      title: "Switch To Lower Carbon Region",
      description: "Migrate workloads to greener cloud regions with renewable energy sources.",
      impact: "High",
      savings: "₹400/month",
      carbonReduction: "15% reduction",
      priority: "High",
    });
  }

  return recommendations;
}
