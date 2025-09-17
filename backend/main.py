import os
import requests
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

# --- Pydantic Models ---
class RecommendationRequest(BaseModel):
    state: Optional[str] = None
    city: Optional[str] = None
    nitrogen: Optional[float] = None
    phosphorus: Optional[float] = None
    potassium: Optional[float] = None
    ph: Optional[float] = None
    temperature: Optional[float] = None
    humidity: Optional[float] = None
    previousCrop: Optional[str] = None
    previousSeason: Optional[str] = None
    previousYield: Optional[float] = None

class WeatherRequest(BaseModel):
    city: Optional[str] = None
    state: Optional[str] = None

class GeocodeRequest(BaseModel):
    lat: float
    lon: float

# --- FastAPI App Setup ---
app = FastAPI()

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- API Endpoints ---
@app.get("/")
def read_root():
    return {"message": "Backend is running"}

@app.post("/api/reverse-geocode")
def get_address_from_coords(request: GeocodeRequest):
    api_key = os.getenv("LOCATIONIQ_API_KEY")
    lat = request.lat
    lon = request.lon
    if not api_key: return {"error": "LocationIQ API key is not configured"}
    url = f"https://us1.locationiq.com/v1/reverse.php?key={api_key}&lat={lat}&lon={lon}&format=json"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        address = data.get('address', {})
        city = address.get('city') or address.get('town') or address.get('village') or address.get('county')
        state = address.get('state')
        return {"city": city, "state": state}
    else: return {"error": "Could not perform reverse geocoding"}

@app.post("/api/weather")
def get_weather(request: WeatherRequest):
    api_key = os.getenv("OPENWEATHER_API_KEY")
    city = request.city
    if not city or not api_key: return {"error": "City and API key are required"}
    weather_url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    response = requests.get(weather_url)
    if response.status_code == 200:
        weather_data = response.json()
        return {"temperature": weather_data['main']['temp'], "humidity": weather_data['main']['humidity']}
    else: return {"error": "Could not fetch weather data", "details": response.json()}

@app.post("/api/market-prices")
def get_market_prices(request: WeatherRequest):
    api_key = os.getenv("MARKET_DATA_API_KEY")
    state = request.state
    if not state or not api_key:
        return {"error": "State and API key are required"}

    resource_id = "35985678-0d79-46b4-9ed6-6f13308a1d24" # Your correct resource ID
    
    market_url = (f"https://api.data.gov.in/resource/{resource_id}?"
                  f"api-key={api_key}&format=json&limit=10&filters[State]={state}")

    try:
        response = requests.get(market_url)
        response.raise_for_status() 
        data = response.json()
        
        records = data.get('records', [])
        
        # --- THE FIX IS HERE ---
        clean_data = [{
            "crop": record.get('Commodity'),      # Changed to Capital 'C'
            "price": record.get('Modal_Price'),    # Changed to Capital 'M' and 'P'
            "demand": "High"
        } for record in records]
        # -----------------------
        
        return clean_data
        
    except requests.exceptions.RequestException as e:
        return {"error": "Failed to fetch market data", "details": str(e)}

@app.post("/api/recommendation")
def get_recommendation(request: RecommendationRequest):
    print("--- Final Data Object Received ---")
    print(request.dict())
    print("---------------------------------")
    return {"message": "Data processed successfully", "final_data": request.dict()}