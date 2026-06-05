import { MonthlyEmission } from "@/types";

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

interface ForecastResult {
  forecast: number[];
  months: string[];
  confidence: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function mean(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function standardDeviation(values: number[]) {
  if (values.length <= 1) {
    return 0;
  }

  const avg = mean(values);
  const variance = mean(values.map((value) => (value - avg) ** 2));
  return Math.sqrt(variance);
}

function buildFutureMonths(lastMonth: string, monthsAhead: number) {
  const startIndex = MONTH_LABELS.indexOf(lastMonth as (typeof MONTH_LABELS)[number]);
  const baseIndex = startIndex >= 0 ? startIndex : 4;

  return Array.from({ length: monthsAhead }, (_, index) => MONTH_LABELS[(baseIndex + index + 1) % MONTH_LABELS.length]);
}

function scoreConfidence(series: number[], fittedSeries: number[]) {
  if (series.length <= 2) {
    return 72;
  }

  const stepErrors = series.slice(1).map((value, index) => {
    const fitted = fittedSeries[index + 1] ?? value;
    return Math.abs(value - fitted) / Math.max(value, 1);
  });
  const monthOverMonthChanges = series.slice(1).map((value, index) => {
    const previous = series[index];
    return (value - previous) / Math.max(previous, 1);
  });

  const meanAbsolutePercentError = mean(stepErrors);
  const volatilityPenalty = standardDeviation(monthOverMonthChanges) * 30;
  const accuracyScore = 97 - meanAbsolutePercentError * 130 - volatilityPenalty;

  return clamp(Math.round(accuracyScore), 58, 96);
}

export function generateTimeSeriesForecast(history: MonthlyEmission[], monthsAhead = 6): ForecastResult {
  const series = history.map((point) => point.co2);
  const lastObservedMonth = history.length > 0 ? history[history.length - 1].month : "May";

  if (series.length === 0) {
    return {
      forecast: Array.from({ length: monthsAhead }, () => 0),
      months: buildFutureMonths(lastObservedMonth, monthsAhead),
      confidence: 58,
    };
  }

  if (series.length === 1) {
    return {
      forecast: Array.from({ length: monthsAhead }, () => series[0]),
      months: buildFutureMonths(lastObservedMonth, monthsAhead),
      confidence: 65,
    };
  }

  const alpha = 0.65;
  const beta = 0.28;
  let level = series[0];
  let trend = series[1] - series[0];
  const fittedSeries = [series[0]];

  for (let index = 1; index < series.length; index += 1) {
    const observed = series[index];
    const fittedValue = level + trend;
    fittedSeries.push(fittedValue);

    const previousLevel = level;
    level = alpha * observed + (1 - alpha) * (level + trend);
    trend = beta * (level - previousLevel) + (1 - beta) * trend;
  }

  return {
    forecast: Array.from({ length: monthsAhead }, (_, index) => Math.max(0, Math.round(level + trend * (index + 1)))),
    months: buildFutureMonths(lastObservedMonth, monthsAhead),
    confidence: scoreConfidence(series, fittedSeries),
  };
}
