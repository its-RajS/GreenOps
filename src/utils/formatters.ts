export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(Math.round(value));
}

export function formatCurrency(value: number): string {
  return "₹" + new Intl.NumberFormat("en-US").format(Math.round(value));
}

export function getTrendPercentage(current: number, previous: number): { percentage: number; isPositive: boolean } {
  if (previous === 0) return { percentage: 0, isPositive: false };
  const percentage = ((current - previous) / previous) * 100;
  return { percentage: Math.abs(percentage), isPositive: percentage < 0 };
}

export function generateMonths(startMonth: string, count: number): string[] {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const startIndex = months.indexOf(startMonth);
  const result: string[] = [];

  for (let i = 0; i < count; i++) {
    result.push(months[(startIndex + i) % 12]);
  }

  return result;
}
