from __future__ import annotations

import math
from typing import Iterable

MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


def clamp(value: float, minimum: int, maximum: int) -> int:
    return max(minimum, min(maximum, int(round(value))))


def mean(values: list[float]) -> float:
    return sum(values) / len(values)


def standard_deviation(values: list[float]) -> float:
    if len(values) <= 1:
        return 0.0

    avg = mean(values)
    variance = mean([(value - avg) ** 2 for value in values])
    return math.sqrt(variance)


def build_future_months(last_month: str, months_ahead: int) -> list[str]:
    try:
        start_index = MONTH_LABELS.index(last_month)
    except ValueError:
        start_index = MONTH_LABELS.index("May")

    return [MONTH_LABELS[(start_index + step) % len(MONTH_LABELS)] for step in range(1, months_ahead + 1)]


def double_exponential_smoothing(series: Iterable[float], months_ahead: int, alpha: float = 0.65, beta: float = 0.28) -> dict:
    values = [float(value) for value in series]
    if len(values) < 2:
        raise ValueError("At least two observations are required for time-series forecasting.")

    level = values[0]
    trend = values[1] - values[0]
    fitted = [values[0]]

    for observed in values[1:]:
        fitted_value = level + trend
        fitted.append(fitted_value)

        previous_level = level
        level = alpha * observed + (1 - alpha) * (level + trend)
        trend = beta * (level - previous_level) + (1 - beta) * trend

    forecast = [max(0, int(round(level + trend * step))) for step in range(1, months_ahead + 1)]
    return {
        "forecast": forecast,
        "fitted": fitted,
        "level": level,
        "trend": trend,
    }


def score_confidence(series: Iterable[float], fitted_series: Iterable[float]) -> int:
    values = [float(value) for value in series]
    fitted = [float(value) for value in fitted_series]

    if len(values) <= 2:
        return 72

    step_errors = [
        abs(value - fitted[index]) / max(value, 1.0)
        for index, value in enumerate(values[1:], start=1)
    ]
    month_over_month_changes = [
        (values[index] - values[index - 1]) / max(values[index - 1], 1.0)
        for index in range(1, len(values))
    ]

    mean_absolute_percent_error = mean(step_errors)
    volatility_penalty = standard_deviation(month_over_month_changes) * 30
    accuracy_score = 97 - mean_absolute_percent_error * 130 - volatility_penalty

    return clamp(accuracy_score, 58, 96)


def build_model_payload(history: Iterable[float], last_month: str = "May", alpha: float = 0.65, beta: float = 0.28) -> dict:
    history_values = [float(value) for value in history]
    result = double_exponential_smoothing(history_values, months_ahead=6, alpha=alpha, beta=beta)

    return {
        "model_type": "double_exponential_smoothing",
        "history": history_values,
        "last_month": last_month,
        "alpha": alpha,
        "beta": beta,
        "confidence": score_confidence(history_values, result["fitted"]),
    }


def forecast_from_payload(payload: dict, months_ahead: int) -> dict:
    result = double_exponential_smoothing(
        payload["history"],
        months_ahead=months_ahead,
        alpha=float(payload.get("alpha", 0.65)),
        beta=float(payload.get("beta", 0.28)),
    )

    return {
        "forecast": result["forecast"],
        "months": build_future_months(str(payload.get("last_month", "May")), months_ahead),
        "confidence": int(payload.get("confidence", score_confidence(payload["history"], result["fitted"]))),
    }
