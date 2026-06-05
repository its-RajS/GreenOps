import { MonthlyEmission } from "@/types";
import { ShiftLeftMetrics } from "@/types/shiftLeft";

export interface ScenarioProfile {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  instances: number;
  storageGb: number;
  databaseInstances: number;
  cpuUtilization: number;
  autoscaling: boolean;
  renewableRegion: boolean;
  monthlyCarbonEmission: number;
  monthlyCarbonHistory: MonthlyEmission[];
  monthlyCloudCost: number;
  metrics: ShiftLeftMetrics;
}

export const scenarios: ScenarioProfile[] = [
  {
    id: "startup",
    name: "Startup",
    icon: "🚀",
    tagline: "Early-stage cloud-native team",
    instances: 4,
    storageGb: 250,
    databaseInstances: 1,
    cpuUtilization: 55,
    autoscaling: true,
    renewableRegion: true,
    monthlyCarbonEmission: 45,
    monthlyCarbonHistory: [
      { month: "Oct", co2: 31 },
      { month: "Nov", co2: 33 },
      { month: "Dec", co2: 34 },
      { month: "Jan", co2: 36 },
      { month: "Feb", co2: 39 },
      { month: "Mar", co2: 41 },
      { month: "Apr", co2: 43 },
      { month: "May", co2: 45 },
    ],
    monthlyCloudCost: 1500,
    metrics: {
      carbonIntensity: 88,
      resourceEfficiency: 82,
      unusedInfrastructure: 78,
      storageOptimization: 85,
      ec2Usage: 55,
      storageUsage: 42,
      carbonGrowth: 5,
      monthlyCloudCost: 1500,
      monthlyCarbonEmission: 45,
    },
  },
  {
    id: "saas",
    name: "SaaS Company",
    icon: "💼",
    tagline: "Mid-size B2B software provider",
    instances: 8,
    storageGb: 1200,
    databaseInstances: 3,
    cpuUtilization: 68,
    autoscaling: true,
    renewableRegion: false,
    monthlyCarbonEmission: 95,
    monthlyCarbonHistory: [
      { month: "Oct", co2: 68 },
      { month: "Nov", co2: 71 },
      { month: "Dec", co2: 74 },
      { month: "Jan", co2: 79 },
      { month: "Feb", co2: 84 },
      { month: "Mar", co2: 88 },
      { month: "Apr", co2: 92 },
      { month: "May", co2: 95 },
    ],
    monthlyCloudCost: 5500,
    metrics: {
      carbonIntensity: 68,
      resourceEfficiency: 76,
      unusedInfrastructure: 72,
      storageOptimization: 70,
      ec2Usage: 68,
      storageUsage: 65,
      carbonGrowth: 14,
      monthlyCloudCost: 5500,
      monthlyCarbonEmission: 95,
    },
  },
  {
    id: "ecommerce",
    name: "E-Commerce Platform",
    icon: "🛒",
    tagline: "High-traffic retail & marketplace",
    instances: 12,
    storageGb: 1800,
    databaseInstances: 4,
    cpuUtilization: 72,
    autoscaling: true,
    renewableRegion: false,
    monthlyCarbonEmission: 120,
    monthlyCarbonHistory: [
      { month: "Oct", co2: 86 },
      { month: "Nov", co2: 90 },
      { month: "Dec", co2: 95 },
      { month: "Jan", co2: 101 },
      { month: "Feb", co2: 107 },
      { month: "Mar", co2: 112 },
      { month: "Apr", co2: 116 },
      { month: "May", co2: 120 },
    ],
    monthlyCloudCost: 8000,
    metrics: {
      carbonIntensity: 60,
      resourceEfficiency: 72,
      unusedInfrastructure: 68,
      storageOptimization: 65,
      ec2Usage: 82,
      storageUsage: 74,
      carbonGrowth: 19,
      monthlyCloudCost: 8000,
      monthlyCarbonEmission: 120,
    },
  },
  {
    id: "enterprise",
    name: "Enterprise Organization",
    icon: "🏢",
    tagline: "Large-scale legacy-heavy infrastructure",
    instances: 20,
    storageGb: 3500,
    databaseInstances: 6,
    cpuUtilization: 35,
    autoscaling: false,
    renewableRegion: false,
    monthlyCarbonEmission: 180,
    monthlyCarbonHistory: [
      { month: "Oct", co2: 124 },
      { month: "Nov", co2: 130 },
      { month: "Dec", co2: 137 },
      { month: "Jan", co2: 145 },
      { month: "Feb", co2: 153 },
      { month: "Mar", co2: 162 },
      { month: "Apr", co2: 171 },
      { month: "May", co2: 180 },
    ],
    monthlyCloudCost: 15000,
    metrics: {
      carbonIntensity: 44,
      resourceEfficiency: 50,
      unusedInfrastructure: 40,
      storageOptimization: 56,
      ec2Usage: 92,
      storageUsage: 85,
      carbonGrowth: 24,
      monthlyCloudCost: 15000,
      monthlyCarbonEmission: 180,
    },
  },
  {
    id: "ai-platform",
    name: "AI Platform",
    icon: "🤖",
    tagline: "GPU-heavy ML inference & training",
    instances: 25,
    storageGb: 5000,
    databaseInstances: 8,
    cpuUtilization: 88,
    autoscaling: true,
    renewableRegion: false,
    monthlyCarbonEmission: 250,
    monthlyCarbonHistory: [
      { month: "Oct", co2: 165 },
      { month: "Nov", co2: 173 },
      { month: "Dec", co2: 182 },
      { month: "Jan", co2: 194 },
      { month: "Feb", co2: 208 },
      { month: "Mar", co2: 223 },
      { month: "Apr", co2: 237 },
      { month: "May", co2: 250 },
    ],
    monthlyCloudCost: 25000,
    metrics: {
      carbonIntensity: 34,
      resourceEfficiency: 70,
      unusedInfrastructure: 62,
      storageOptimization: 52,
      ec2Usage: 96,
      storageUsage: 91,
      carbonGrowth: 33,
      monthlyCloudCost: 25000,
      monthlyCarbonEmission: 250,
    },
  },
];

export function getScenarioById(id: string): ScenarioProfile | undefined {
  return scenarios.find((s) => s.id === id);
}

export function buildMonthlyCarbonData(history: MonthlyEmission[]) {
  return history.map((point) => ({ ...point }));
}

export function buildServiceBreakdown(scenario: ScenarioProfile) {
  const computePct = Math.min(60, Math.round(45 + scenario.cpuUtilization * 0.09));
  const dbPct = Math.min(20, scenario.databaseInstances * 3 + 4);
  const storagePct = Math.min(22, Math.round(scenario.storageGb / 300));
  const networkPct = Math.max(5, 100 - computePct - dbPct - storagePct);

  return [
    { name: "EC2 Compute", value: computePct, percentage: computePct },
    { name: "Storage", value: storagePct, percentage: storagePct },
    { name: "Database", value: dbPct, percentage: dbPct },
    { name: "Network", value: networkPct, percentage: networkPct },
  ];
}
