# Shift-Left Sustainability Engine

## Overview

The **Shift-Left Sustainability Engine** is a core differentiator of GreenOps AI. Unlike traditional sustainability platforms that monitor carbon emissions **after** deployment, this engine proactively analyzes cloud infrastructure patterns and identifies sustainability risks **before** they become larger problems.

---

## Philosophy: Shift-Left Approach

**Traditional Approach:**
```
Deploy → Monitor → Alert → React → Optimize (Too Late!)
```

**Shift-Left Approach:**
```
Analyze → Identify Risks → Recommend → Implement → Monitor
```

The Shift-Left engine catches sustainability problems early in the infrastructure lifecycle, enabling proactive optimization.

---

## Architecture

### Components

1. **Metrics Analyzer** - Evaluates 6 key sustainability dimensions
2. **Score Calculator** - Weighted formula for sustainability score
3. **Risk Assessor** - Maps scores to actionable risk levels
4. **Findings Generator** - Identifies specific sustainability issues
5. **Recommendation Engine** - Suggests targeted optimizations
6. **Projection Calculator** - Forecasts improvement potential

### Data Flow

```
Input Metrics
    ↓
Score Calculation
    ↓
Risk Assessment
    ↓
Findings Generation ← Deterministic Rules
    ↓
Recommendations ← Business Rules
    ↓
Projection Calculation
    ↓
Complete Analysis
    ↓
API Response
    ↓
UI Visualization
```

---

## Metrics Analyzed

### 1. Carbon Intensity (Weight: 30%)
- Measures CO₂ emissions per unit of computing
- Lower is better
- Range: 0-100

### 2. Resource Efficiency (Weight: 30%)
- Evaluates CPU, memory, and storage utilization
- Higher is better
- Range: 0-100

### 3. Unused Infrastructure (Weight: 20%)
- Identifies unutilized cloud resources
- Higher percentage of utilized = better
- Range: 0-100

### 4. Storage Optimization (Weight: 20%)
- Assesses data storage configuration and tiering
- Higher efficiency = better
- Range: 0-100

### 5. Cloud Resource Utilization (Findings Only)
- EC2 Usage Threshold: 80%
- Storage Usage Threshold: 60%

### 6. Carbon Growth Trend (Findings Only)
- Growth Threshold: 10% month-over-month

---

## Score Calculation

### Formula

```
Score = (CI × 0.3) + (RE × 0.3) + (UI × 0.2) + (SO × 0.2)

Where:
  CI = Carbon Intensity
  RE = Resource Efficiency
  UI = Unused Infrastructure
  SO = Storage Optimization
```

### Grade Mapping

| Score Range | Grade | Interpretation |
|-------------|-------|-----------------|
| 90-100      | A     | Excellent       |
| 80-89       | B     | Good            |
| 70-79       | C     | Average         |
| 60-69       | D     | Poor            |
| 0-59        | F     | Critical        |

### Example

```
Input Metrics:
  Carbon Intensity: 72
  Resource Efficiency: 81
  Unused Infrastructure: 84
  Storage Optimization: 76

Calculation:
  Score = (72 × 0.3) + (81 × 0.3) + (84 × 0.2) + (76 × 0.2)
        = 21.6 + 24.3 + 16.8 + 15.2
        = 77.9
        ≈ 78

Result: Grade B (Good Performance)
```

---

## Risk Assessment

### Risk Levels

| Score | Risk Level    | Color      | Action Required |
|-------|---------------|------------|-----------------|
| 90+   | Low Risk      | Emerald    | Monitor         |
| 80-89 | Low Risk      | Green      | Monitor         |
| 70-79 | Medium Risk   | Amber      | Review          |
| 60-69 | High Risk     | Orange     | Act Soon        |
| <60   | Critical Risk | Red        | Urgent Action   |

### Example

A score of 78 → **Medium Risk** → "Significant improvement potential"

---

## Findings Engine

Deterministic rules identify specific sustainability issues.

### Rule 1: High EC2 Usage
```
IF ec2Usage > 80%
THEN Finding: "Idle EC2 resources detected"
     Impact: "High"
     Affected: ["EC2", "Compute"]
```

### Rule 2: High Storage Usage
```
IF storageUsage > 60%
THEN Finding: "Cold storage archive opportunity detected"
     Impact: "Medium"
     Affected: ["Storage", "S3"]
```

### Rule 3: Carbon Growth
```
IF carbonGrowth > 10% month-over-month
THEN Finding: "Carbon emissions increasing faster than benchmark"
     Impact: "High"
     Affected: ["Overall Infrastructure"]
```

### Rule 4-6: Efficiency & Infrastructure
```
IF resourceEfficiency < 70
THEN Finding: "Low Resource Efficiency"

IF unusedInfrastructure < 65
THEN Finding: "Significant Unused Infrastructure"

IF storageOptimization < 60
THEN Finding: "Storage Optimization Opportunity"
```

---

## Recommendation Engine

Rules-based recommendations tied to findings.

### Recommendation 1: Downsize EC2

**Trigger:** `ec2Usage > 80%`

**Details:**
- Title: Downsize Idle EC2 Instances
- Savings: ₹500/month
- Carbon Reduction: 12 Kg CO₂
- Score Increase: +6
- Difficulty: Easy
- Timeline: 1-2 weeks
- Risk: Low

### Recommendation 2: Archive Storage

**Trigger:** `storageUsage > 60%`

**Details:**
- Title: Archive Cold Storage Data
- Savings: ₹300/month
- Carbon Reduction: 8 Kg CO₂
- Score Increase: +4
- Difficulty: Medium
- Timeline: 2-3 weeks
- Risk: Low

### Recommendation 3: Green Region

**Trigger:** `carbonGrowth > 10%`

**Details:**
- Title: Migrate to Lower Carbon Region
- Savings: ₹0/month
- Carbon Reduction: 15%
- Score Increase: +8
- Difficulty: Hard
- Timeline: 4-8 weeks
- Risk: Medium

### Recommendation 4: Database Optimization

**Trigger:** `compositeScore < 85`

**Details:**
- Title: Optimize Database Connections & Queries
- Savings: ₹150/month
- Carbon Reduction: 4 Kg CO₂
- Score Increase: +3
- Difficulty: Medium
- Timeline: 2-4 weeks
- Risk: Low

---

## Projection Engine

Calculates potential improvements if recommendations are implemented.

### Formula

```
Projected Score = Current Score + Σ(Recommendation Score Increases)
Maximum Score = 100

Total Savings = Σ(Recommendation Savings)
Total Carbon Reduction = Σ(Recommendation Reductions)
```

### Example

```
Current Score: 78 (B)
Recommendations:
  - Downsize EC2: +6
  - Archive Storage: +4
  - Green Region: +8
  - Database Optimization: +3

Projected Score: 78 + 6 + 4 + 8 + 3 = 99 (capped at 100 = A)

Total Savings: ₹500 + ₹300 + ₹0 + ₹150 = ₹950/month
Total Carbon Reduction: 12 + 8 + 15% + 4 = 35%+ reduction

ROI: 28% cost reduction, 35% carbon reduction
```

---

## Executive Summary

Auto-generated summary providing:

1. **Current Status** - Plain English interpretation of score
2. **Key Findings** - Top 3 sustainability issues
3. **Immediate Actions** - High-priority recommendations to implement first
4. **Expected Outcome** - Quantified improvement potential

### Example

```json
{
  "currentStatus": "Strong sustainability performance with opportunities for optimization",
  "keyFindings": [
    "High EC2 Resource Utilization",
    "Cold Storage Archive Opportunity",
    "Accelerating Carbon Emissions"
  ],
  "immediateActions": [
    "Downsize Idle EC2 Instances",
    "Migrate to Lower Carbon Region"
  ],
  "expectedOutcome": "Implementing all recommendations can improve sustainability score from B to A and reduce carbon emissions by 35%."
}
```

---

## API Endpoint

### Endpoint

```
GET /api/shift-left
```

### Response Format

```json
{
  "score": {
    "score": "B",
    "value": 82,
    "breakdown": {
      "carbonIntensity": 72,
      "resourceEfficiency": 81,
      "unusedInfrastructure": 84,
      "storageOptimization": 76
    }
  },
  "risk": {
    "risk": "Medium Risk",
    "riskLevel": 50,
    "color": "#f59e0b",
    "description": "Moderate sustainability concerns. Significant improvement potential."
  },
  "findings": [
    {
      "severity": "high",
      "title": "High EC2 Resource Utilization",
      "description": "EC2 instances are operating at 87% utilization...",
      "impact": "12 Kg CO₂ per month",
      "affected_resources": ["EC2", "Compute"]
    }
  ],
  "recommendations": [
    {
      "id": "rec-ec2-downsize",
      "title": "Downsize Idle EC2 Instances",
      "description": "Analysis shows multiple EC2 instances...",
      "priority": "High",
      "savings": "₹500/month",
      "carbonReduction": "12 Kg CO₂",
      "scoreIncrease": 6,
      "implementationDifficulty": "Easy",
      "estimatedTimeToImplement": "1-2 weeks",
      "riskLevel": "Low"
    }
  ],
  "projection": {
    "projectedScore": "A",
    "projectedValue": 99,
    "projectedCarbonReduction": "35%",
    "projectedSavings": "₹950/month",
    "projectedCostSavingsPercentage": 21.1,
    "projectedCarbonReductionPercentage": 35,
    "improvementPotential": 21
  },
  "executiveSummary": {
    "currentStatus": "Strong sustainability performance with opportunities for optimization",
    "keyFindings": ["High EC2 Resource Utilization", "Cold Storage Archive Opportunity", "Accelerating Carbon Emissions"],
    "immediateActions": ["Downsize Idle EC2 Instances", "Migrate to Lower Carbon Region"],
    "expectedOutcome": "Implementing all recommendations can improve sustainability score from B to A and reduce carbon emissions by 35%."
  },
  "timestamp": "2026-06-05T10:30:00.000Z",
  "analysisDuration": 12
}
```

---

## UI Components

### Dashboard Integration

The Shift-Left Engine powers these dashboard components:

1. **Shift-Left Score Card** - Displays sustainability score with breakdown
2. **Risk Assessment Card** - Visual risk level indicator
3. **Findings Panel** - Lists identified issues with severity
4. **Recommendations Panel** - Actionable optimization suggestions
5. **Projected Improvement Widget** - Shows potential ROI

### Route

Navigate to: `/shift-left`

---

## Implementation Details

### Files Created

- `src/types/shiftLeft.ts` - TypeScript interfaces
- `src/data/shiftLeftData.ts` - Mock data and rules
- `src/services/shiftLeftEngine.ts` - Analysis engine logic
- `src/app/api/shift-left/route.ts` - API endpoint
- `src/app/shift-left/page.tsx` - UI page component

### Technology

- **Language:** TypeScript (100% type-safe)
- **Framework:** Next.js 14
- **Data:** Mock data (no database)
- **Rules:** Deterministic (no ML/AI)
- **Architecture:** Pure functions (testable, explainable)

---

## Key Features

### ✅ Explainability
Every finding and recommendation is traceable to specific rules and metrics.

### ✅ Deterministic
Produces consistent, predictable results based on input metrics.

### ✅ Scalable
Rule engine can be extended with new findings and recommendations.

### ✅ Production-Ready
Full TypeScript coverage, error handling, and performance optimization.

### ✅ Demo-Friendly
Beautiful UI with clear visualizations and actionable insights.

---

## Example Scenarios

### Scenario 1: Excellent Performance (Score A)

```
Metrics: Carbon Intensity 95, Resource Efficiency 94, Unused Infra 92, Storage Opt 96
Score: 93 (A)
Risk: Low Risk
Findings: [Minimal issues]
Recommendations: [Maintenance only]
Outlook: Excellent - maintain current practices
```

### Scenario 2: Average Performance (Score B)

```
Metrics: Carbon Intensity 72, Resource Efficiency 81, Unused Infra 84, Storage Opt 76
Score: 78 (B)
Risk: Low Risk / Medium Risk boundary
Findings: [High EC2 usage, storage optimization opportunity]
Recommendations: [Downsize EC2, Archive storage, Switch region]
Outlook: Good - implement recommendations for improvement
```

### Scenario 3: Critical Performance (Score F)

```
Metrics: Carbon Intensity 32, Resource Efficiency 41, Unused Infra 25, Storage Opt 38
Score: 35 (F)
Risk: Critical Risk
Findings: [Multiple critical issues across all dimensions]
Recommendations: [Urgent - all recommendations]
Outlook: Critical - immediate action required
```

---

## Future Enhancements

### Phase 2
- Real-time metric ingestion from cloud providers
- Custom rule configuration
- Historical trend analysis
- Benchmarking against industry standards

### Phase 3
- ML-based anomaly detection
- Predictive cost forecasting
- Automated remediation
- Multi-cloud support

### Phase 4
- Custom KPI definitions
- Integration with FinOps tools
- Sustainability compliance reporting
- Carbon credit optimization

---

## Summary

The Shift-Left Sustainability Engine is a **deterministic, explainable, and scalable** system for identifying sustainability risks early. By analyzing cloud infrastructure patterns with well-defined business rules, it enables organizations to optimize their environmental impact proactively, rather than reactively.

Perfect for MVP demonstration and hackathon presentations! 🚀
