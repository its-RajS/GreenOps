# GreenOps AI Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js 15)                        │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┐  │
│  │  Dashboard   │  Forecast    │ Recommend.   │ Green Score  │  │
│  └──────────────┴──────────────┴──────────────┴──────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
         ┌──────────▼──────────┐   ┌────▼──────────────┐
         │   API Routes        │   │ Python Service   │
         │ (Next.js Handlers)  │   │ (FastAPI)        │
         │                     │   │                  │
         │ • /api/dashboard    │   │ • /forecast      │
         │ • /api/forecast     │   │ • /health        │
         │ • /api/recommend    │   │                  │
         │ • /api/green-score  │   │ Forecast Model   │
         └─────────────────────┘   │ (Time-Series)    │
                                    └──────────────────┘
                    │
         ┌──────────▼──────────┐
         │   Mock Data Layer   │
         │ (No Database)       │
         │                     │
         │ • mockData.ts       │
         │ • Recommendation    │
         │   Engine            │
         │ • Green Score       │
         │   Engine            │
         │ • Forecast Service  │
         └─────────────────────┘
```

## Data Flow

1. **User Action** → Frontend Component
2. **API Call** → Next.js Route Handler
3. **Data Processing** → Mock Data + Business Logic
4. **Optional ML** → Python FastAPI Service (for forecasting)
5. **Response** → Component → UI Render

## Components Structure

### Frontend Components
- **Layout**: Navbar, Sidebar
- **Cards**: KpiCard, AIInsightsCard, RecommendationCard, GreenScoreCard
- **Charts**: CarbonTrendChart, ServiceBreakdownChart
- **Pages**: Dashboard, Forecast, Recommendations, GreenScore

### Services
- **Recommendation Engine**: Rule-based suggestions
- **Green Score Engine**: Multi-factor scoring
- **Forecast Service**: Historical trend prediction
- **Formatters**: Number formatting utilities
- **Colors**: UI color management

### API Routes
- `/api/dashboard` - Dashboard KPIs and charts data
- `/api/forecast` - 6-month carbon emission forecast
- `/api/recommendations` - Sustainability recommendations
- `/api/green-score` - Green score and factors

## Technology Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **UI Library**: Shadcn UI, Lucide React
- **Charts**: Recharts
- **Backend**: Next.js Route Handlers
- **ML Service**: FastAPI, custom time-series smoothing
- **Data**: Mock JSON (no database)

## Scalability Notes

The current architecture uses:
- **Mock Data**: Suitable for MVP/hackathon
- **To Scale**: Replace mock data with real database (PostgreSQL/MongoDB)
- **Real-time**: Add WebSocket support for live updates
- **ML Enhancement**: Expand Python service with advanced models (ARIMA, Prophet, etc.)
