import joblib
import os
from time_series_model import forecast_from_payload

model_path = os.path.join(os.path.dirname(__file__), 'carbon_forecast_model.pkl')

def load_model():
    """Load the trained forecasting model"""
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model not found at {model_path}. Please run train_model.py first.")
    return joblib.load(model_path)

def generate_forecast_payload(months_ahead: int = 6) -> dict:
    """Generate a time-series forecast and return metadata used by the API."""
    model = load_model()
    return forecast_from_payload(model, months_ahead=months_ahead)

def generate_forecast(months_ahead: int = 6) -> list:
    """Generate carbon emission forecast for the next N months"""
    try:
        return generate_forecast_payload(months_ahead=months_ahead)["forecast"]
    except Exception as e:
        print(f"Error generating forecast: {e}")
        # Return fallback forecast if model unavailable
        return [130, 135, 140, 145, 150, 155]

if __name__ == "__main__":
    forecast = generate_forecast_payload()
    print(f"Forecast: {forecast['forecast']}")
