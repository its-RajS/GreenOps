# GreenOps AI Workflow

## Data Collection & Processing

```
Cloud Infrastructure Data
         │
         ▼
    ┌─────────────────────────────┐
    │  CO₂ Calculation Engine     │
    │                             │
    │ • AWS, GCP, Azure metrics   │
    │ • Resource utilization      │
    │ • Energy consumption data   │
    └─────────────────────────────┘
         │
         ▼
    ┌─────────────────────────────┐
    │  Historical Data Storage    │
    │  (Monthly Emissions)        │
    │                             │
    │ Jan: 80 kg CO₂              │
    │ Feb: 95 kg CO₂              │
    │ Mar: 110 kg CO₂             │
    │ Apr: 120 kg CO₂             │
    │ May: 125 kg CO₂             │
    └─────────────────────────────┘
```

## Prediction Pipeline

```
Historical CO₂ Data
         │
         ▼
    ┌─────────────────────────────┐
    │  ML Forecast Model          │
    │  (Time-Series Smoothing)    │
    │                             │
    │ Predicts next 6 months      │
    └─────────────────────────────┘
         │
         ▼
    ┌─────────────────────────────┐
    │  Trend Analysis             │
    │  • Upward trend: +5 kg/month│
    │  • Growth rate calculation  │
    │  • Confidence scoring       │
    └─────────────────────────────┘
         │
         ▼
    Jun: 130 kg CO₂ (Predicted)
    Jul: 135 kg CO₂ (Predicted)
    Aug: 140 kg CO₂ (Predicted)
    ... (continued for 6 months)
```

## Recommendation Generation

```
Input Data Analysis
│
├─ EC2 Utilization: High (>80%)
│  └─► Recommendation: Downsize instances
│      ▼
│  Savings: ₹500/month
│  Reduction: 12 kg CO₂
│
├─ Storage Usage: High (>60%)
│  └─► Recommendation: Archive cold storage
│      ▼
│  Savings: ₹300/month
│  Reduction: 8 kg CO₂
│
└─ Carbon Growth: >10%
   └─► Recommendation: Switch to green region
       ▼
   Savings: ₹400/month
   Reduction: 15% reduction
```

## Green Score Calculation

```
Input Factors:
│
├─ Carbon Intensity: 75/100
├─ Resource Efficiency: 82/100
├─ Unused Infrastructure: 68/100
└─ Storage Optimization: 85/100
     │
     ▼
  Average Score = (75 + 82 + 68 + 85) / 4 = 78
     │
     ▼
  Score Letter = 'B' (Good: 80-89)
     │
     ▼
  Output: B Grade with factors breakdown
```

## Dashboard Visualization

```
User Opens Dashboard
         │
         ▼
    ┌─────────────────────────────┐
    │  Fetch Dashboard Data       │
    │  • KPI Cards                │
    │  • Carbon Trend Chart       │
    │  • Service Breakdown        │
    │  • AI Insights              │
    └─────────────────────────────┘
         │
         ▼
    ┌─────────────────────────────┐
    │  Render Components          │
    │  • Animated transitions     │
    │  • Interactive charts       │
    │  • Real-time updates        │
    └─────────────────────────────┘
         │
         ▼
    Beautiful Dashboard UI
    (Dark mode, professional design)
```

## User Journey

### Path 1: Monitor (Dashboard)
Dashboard → View KPIs → Check Trends → Review AI Insights

### Path 2: Predict (Forecast)
Forecast Page → View 6-month Prediction → Analyze Trend → Get Insights

### Path 3: Optimize (Recommendations)
Recommendations Page → Review Suggestions → Prioritize by Impact → Implement

### Path 4: Score (Green Score)
Green Score Page → View Overall Rating → Analyze Factors → Improve Areas

## Performance Metrics

- **Dashboard Load**: < 1s
- **Data Fetch**: Parallel requests (3-4 concurrent)
- **Chart Rendering**: Recharts optimized (virtualization)
- **API Response**: < 100ms (mock data)
- **ML Prediction**: < 500ms (Python service)

## Scalability Considerations

1. **Data Volume**: Currently handles 5 months of historical data
   - To scale: Implement data partitioning, caching
   
2. **Real-time Updates**: Currently manual refresh
   - To scale: Add polling/WebSocket
   
3. **ML Models**: Single time-series smoothing model
   - To scale: Add ensemble methods, multiple models
   
4. **User Concurrency**: Single instance
   - To scale: Horizontal scaling, load balancing
