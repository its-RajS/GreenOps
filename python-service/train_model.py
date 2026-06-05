# pyrefly: ignore [missing-import]
import joblib
import os
from time_series_model import build_model_payload, forecast_from_payload

# Historical time series ending in May
co2_emissions = [72, 78, 84, 91, 99, 108, 118, 126]

# Fit the time-series payload
model = build_model_payload(co2_emissions, last_month="May")

# Save the model
model_path = os.path.join(os.path.dirname(__file__), 'carbon_forecast_model.pkl')
joblib.dump(model, model_path)

print(f"Model trained and saved to {model_path}")
print(f"Model type: {model['model_type']}")
print(f"Training confidence: {model['confidence']}%")
print(f"Historical observations: {co2_emissions}")

# Test prediction for next 6 months
predictions = forecast_from_payload(model, months_ahead=6)
print(f"Forecast for next 6 months: {predictions['forecast']}")
