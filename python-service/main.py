# pyrefly: ignore [missing-import]
from fastapi import FastAPI
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware
from forecast import generate_forecast_payload
# pyrefly: ignore [missing-import]
from pydantic import BaseModel
from typing import List
from time_series_model import double_exponential_smoothing, build_future_months, score_confidence
# pyrefly: ignore [missing-import]
import uvicorn
import os

app = FastAPI(title="GreenOps AI - Forecast Service", version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ForecastRequest(BaseModel):
    history: List[float]
    last_month: str = "May"
    months_ahead: int = 6

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"status": "ok", "service": "GreenOps AI Forecast Service"}

@app.get("/forecast")
async def get_forecast():
    """Get carbon emission forecast for next 6 months (static model)"""
    try:
        forecast = generate_forecast_payload(months_ahead=6)
        return {
            "forecast": forecast["forecast"],
            "months": forecast["months"],
            "confidence": forecast["confidence"],
            "unit": "Kg CO₂"
        }
    except Exception as e:
        return {
            "forecast": [130, 135, 140, 145, 150, 155],
            "months": ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
            "confidence": 85,
            "error": str(e),
            "note": "Using fallback forecast due to model unavailability"
        }

@app.post("/forecast")
async def predict_forecast(request: ForecastRequest):
    """Generate dynamic forecast from provided history"""
    try:
        if len(request.history) < 2:
            return {
                "forecast": [request.history[0]] * request.months_ahead if request.history else [0] * request.months_ahead,
                "months": build_future_months(request.last_month, request.months_ahead),
                "confidence": 65 if request.history else 58,
                "unit": "Kg CO₂"
            }
            
        result = double_exponential_smoothing(request.history, months_ahead=request.months_ahead)
        months = build_future_months(request.last_month, request.months_ahead)
        confidence = score_confidence(request.history, result["fitted"])
        
        return {
            "forecast": result["forecast"],
            "months": months,
            "confidence": confidence,
            "unit": "Kg CO₂"
        }
    except Exception as e:
        return {
            "error": str(e),
            "status": "failed"
        }

@app.get("/health")
async def health_check():
    """Health check for the service"""
    return {"status": "healthy", "service": "forecast"}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 9000))
    uvicorn.run(app, host="0.0.0.0", port=port)
