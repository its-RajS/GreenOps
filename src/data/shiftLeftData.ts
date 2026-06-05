import { ShiftLeftMetrics } from "@/types/shiftLeft";

export const defaultShiftLeftMetrics: ShiftLeftMetrics = {
  carbonIntensity: 72,
  resourceEfficiency: 81,
  unusedInfrastructure: 84,
  storageOptimization: 76,
  ec2Usage: 87,
  storageUsage: 72,
  carbonGrowth: 12,
  monthlyCloudCost: 4500,
  monthlyCarbonEmission: 125,
};

export const scenarios = {
  excellent: {
    carbonIntensity: 95,
    resourceEfficiency: 94,
    unusedInfrastructure: 92,
    storageOptimization: 96,
    ec2Usage: 42,
    storageUsage: 35,
    carbonGrowth: -5,
    monthlyCloudCost: 2500,
    monthlyCarbonEmission: 65,
  },

  good: {
    carbonIntensity: 85,
    resourceEfficiency: 88,
    unusedInfrastructure: 82,
    storageOptimization: 86,
    ec2Usage: 58,
    storageUsage: 45,
    carbonGrowth: 2,
    monthlyCloudCost: 3500,
    monthlyCarbonEmission: 95,
  },

  average: {
    carbonIntensity: 72,
    resourceEfficiency: 81,
    unusedInfrastructure: 84,
    storageOptimization: 76,
    ec2Usage: 87,
    storageUsage: 72,
    carbonGrowth: 12,
    monthlyCloudCost: 4500,
    monthlyCarbonEmission: 125,
  },

  poor: {
    carbonIntensity: 55,
    resourceEfficiency: 62,
    unusedInfrastructure: 48,
    storageOptimization: 58,
    ec2Usage: 94,
    storageUsage: 88,
    carbonGrowth: 28,
    monthlyCloudCost: 6500,
    monthlyCarbonEmission: 185,
  },

  critical: {
    carbonIntensity: 32,
    resourceEfficiency: 41,
    unusedInfrastructure: 25,
    storageOptimization: 38,
    ec2Usage: 98,
    storageUsage: 95,
    carbonGrowth: 45,
    monthlyCloudCost: 8500,
    monthlyCarbonEmission: 245,
  },
};

export const shiftLeftRules = {
  ec2HighUsageThreshold: 80,
  storageHighUsageThreshold: 60,
  carbonGrowthThreshold: 10,
};

export const improvementActions = {
  downsizeEc2: {
    savings: "₹500/month",
    carbonReduction: "12 Kg CO₂",
    scoreIncrease: 6,
    description: "Terminate or downsize idle and underutilized EC2 instances",
  },
  archiveStorage: {
    savings: "₹300/month",
    carbonReduction: "8 Kg CO₂",
    scoreIncrease: 4,
    description: "Move inactive data to lower-cost archive tiers",
  },
  switchRegion: {
    savings: "₹0/month",
    carbonReduction: "15%",
    scoreIncrease: 8,
    description: "Migrate workloads to regions powered by renewable energy",
  },
  optimizeDatabase: {
    savings: "₹150/month",
    carbonReduction: "4 Kg CO₂",
    scoreIncrease: 3,
    description: "Implement connection pooling and query optimization",
  },
};
