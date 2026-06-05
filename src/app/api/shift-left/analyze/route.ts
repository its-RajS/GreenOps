import { NextRequest, NextResponse } from "next/server";
import { getScenarioById, buildMonthlyCarbonData, buildServiceBreakdown } from "@/data/scenarios";
import { analyzeShiftLeft } from "@/services/shiftLeftEngine";
import { calculateGreenScore } from "@/services/greenScoreEngine";
import { generateRecommendations } from "@/services/recommendationEngine";
import { generateTimeSeriesForecast } from "@/services/forecastEngine";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { scenarioId } = body as { scenarioId: string };

    if (!scenarioId) {
      return NextResponse.json({ error: "scenarioId is required" }, { status: 400 });
    }

    const scenario = getScenarioById(scenarioId);
    if (!scenario) {
      return NextResponse.json({ error: "Scenario not found" }, { status: 404 });
    }

    const analysis = analyzeShiftLeft(scenario.metrics);

    const greenScore = calculateGreenScore(
      scenario.metrics.carbonIntensity,
      scenario.metrics.resourceEfficiency,
      scenario.metrics.unusedInfrastructure,
      scenario.metrics.storageOptimization
    );

    const basicRecs = generateRecommendations(
      scenario.metrics.ec2Usage,
      scenario.metrics.storageUsage,
      scenario.metrics.carbonGrowth
    );

    const monthlyCarbonData = buildMonthlyCarbonData(scenario.monthlyCarbonHistory);
    const serviceBreakdown = buildServiceBreakdown(scenario);

    let forecastResult;
    try {
      const history = monthlyCarbonData.map(d => d.co2);
      const lastMonth = monthlyCarbonData.length > 0 ? monthlyCarbonData[monthlyCarbonData.length - 1].month : "May";
      const response = await fetch(process.env.PYTHON_API_URL || "http://127.0.0.1:8000/forecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history, last_month: lastMonth, months_ahead: 6 }),
      });
      if (!response.ok) {
        throw new Error(`Python API returned ${response.status}`);
      }
      const data = await response.json();
      if (data.status === "failed") {
        throw new Error(data.error || "Python API error");
      }
      forecastResult = data;
    } catch (e) {
      console.warn("Python forecasting API failed, falling back to local engine:", e);
      forecastResult = generateTimeSeriesForecast(monthlyCarbonData, 6);
    }
    const forecast = forecastResult.forecast;
    const forecastMonths = forecastResult.months;
    const latestObserved = monthlyCarbonData.length > 0
      ? monthlyCarbonData[monthlyCarbonData.length - 1].co2
      : scenario.monthlyCarbonEmission;
    const projectedChangePct = latestObserved === 0
      ? 0
      : ((forecast[0] - latestObserved) / latestObserved) * 100;

    const aiInsight = {
      title: `${scenario.name} Carbon Analysis`,
      message: `Carbon emissions projected to ${projectedChangePct >= 0 ? "increase" : "decrease"} by ${Math.abs(projectedChangePct).toFixed(1)}% next month based on the recent time series trend.`,
      suggestion: `Primary driver: ${scenario.cpuUtilization > 70 ? "High CPU utilization" : "Storage & database overhead"}. ${scenario.renewableRegion ? "Renewable region helps reduce carbon intensity." : "Consider migrating to a renewable-energy region."}`,
      severity: projectedChangePct > 15 ? "high" : projectedChangePct > 7 ? "medium" : "low",
    };

    return NextResponse.json({
      scenario: {
        id: scenario.id,
        name: scenario.name,
        instances: scenario.instances,
        storageGb: scenario.storageGb,
        databaseInstances: scenario.databaseInstances,
        cpuUtilization: scenario.cpuUtilization,
        autoscaling: scenario.autoscaling,
        renewableRegion: scenario.renewableRegion,
      },
      greenScore,
      shiftLeft: {
        score: analysis.score.score,
        value: analysis.score.value,
        projectedScore: analysis.projection.projectedScore,
        projectedValue: analysis.projection.projectedValue,
        risk: analysis.risk.risk,
        riskColor: analysis.risk.color,
        projectedSavings: analysis.projection.projectedSavings,
        projectedCarbonReduction: analysis.projection.projectedCarbonReduction,
        findings: analysis.findings,
        recommendations: analysis.recommendations,
        projection: analysis.projection,
        executiveSummary: analysis.executiveSummary,
        breakdown: analysis.score.breakdown,
      },
      recommendations: basicRecs,
      dashboardMetrics: {
        totalCarbon: scenario.monthlyCarbonEmission,
        cloudCost: scenario.monthlyCloudCost,
        predictedCarbon: forecast[0],
        greenScore: greenScore.score,
        monthlyCarbonData,
        serviceBreakdown,
        aiInsight,
      },
      forecast: {
        forecast,
        confidence: forecastResult.confidence,
        months: forecastMonths,
      },
    });
  } catch (error) {
    console.error("Analyze error:", error);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
