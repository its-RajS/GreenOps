const SEVERITY_COLORS = {
  high: "bg-[#cb2eba]/10 text-[#cb2eba] border-[#cb2eba]/20",
  medium: "bg-[#787496]/10 text-[#787496] border-[#787496]/20",
  low: "bg-[#d8bfd8]/10 text-[#787496] border-[#d8bfd8]/30",
};

export function getSeverityColor(severity: "high" | "medium" | "low"): string {
  return SEVERITY_COLORS[severity];
}

export function getPriorityColor(priority: "High" | "Medium" | "Low"): string {
  const colors: Record<string, string> = {
    High: "bg-[#cb2eba]/10 text-[#cb2eba]",
    Medium: "bg-[#787496]/10 text-[#787496]",
    Low: "bg-[#d8bfd8]/10 text-[#787496]",
  };
  return colors[priority];
}

export function getScoreColor(score: string): string {
  const colors: Record<string, string> = {
    A: "text-[#cb2eba]",
    B: "text-[#787496]",
    C: "text-[#d8bfd8]",
    D: "text-[#787496]",
    F: "text-[#cb2eba]",
  };
  return colors[score] || "text-[#787496]";
}
