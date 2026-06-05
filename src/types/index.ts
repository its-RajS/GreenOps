export interface MonthlyEmission {
  month: string;
  co2: number;
}

export interface ServiceBreakdown {
  name: string;
  value: number;
  percentage: number;
}

export interface DashboardData {
  totalCarbon: number;
  cloudCost: number;
  predictedCarbon: number;
  greenScore: string;
  monthlyCarbonData: MonthlyEmission[];
  serviceBreakdown: ServiceBreakdown[];
}

export interface ForecastData {
  forecast: number[];
  confidence: number;
  months: string[];
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: string;
  savings: string;
  carbonReduction: string;
  priority: "High" | "Medium" | "Low";
}

export interface GreenScore {
  score: string;
  scoreValue: number;
  carbonIntensity: number;
  resourceEfficiency: number;
  unusedInfrastructure: number;
  storageOptimization: number;
}

export interface AIInsight {
  title: string;
  message: string;
  suggestion: string;
  severity: "high" | "medium" | "low";
}
