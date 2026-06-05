const SEVERITY_COLORS = {
  high: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
  medium: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
  low: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
};

export function getSeverityColor(severity: "high" | "medium" | "low"): string {
  return SEVERITY_COLORS[severity];
}

export function getPriorityColor(priority: "High" | "Medium" | "Low"): string {
  const colors: Record<string, string> = {
    High: "bg-red-500/10 text-red-700 dark:text-red-400",
    Medium: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    Low: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  };
  return colors[priority];
}

export function getScoreColor(score: string): string {
  const colors: Record<string, string> = {
    A: "text-emerald-600 dark:text-emerald-400",
    B: "text-blue-600 dark:text-blue-400",
    C: "text-yellow-600 dark:text-yellow-400",
    D: "text-orange-600 dark:text-orange-400",
    F: "text-red-600 dark:text-red-400",
  };
  return colors[score] || "text-gray-600";
}
