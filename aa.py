from fastapi import FastAPI, Request, Depends, Query
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, Float, String
from sqlalchemy.orm import declarative_base, sessionmaker, Session
import requests
import os

# ------------------- Database Setup -------------------
DATABASE_URL = "sqlite:///./locations.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True)
    ip_address = Column(String, index=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    city = Column(String, nullable=True)
    country = Column(String, nullable=True)
    temperature = Column(Float, nullable=True)
    weather_description = Column(String, nullable=True)
    humidity = Column(Integer, nullable=True)
    wind_speed = Column(Float, nullable=True)
    rainfall_mm_h = Column(Float, nullable=True)  # Rainfall in mm/h

Base.metadata.create_all(bind=engine)

# ------------------- Pydantic Schema -------------------
class LocationCreate(BaseModel):
    latitude: float
    longitude: float

# ------------------- FastAPI App -------------------
app = FastAPI()

# Enable CORS for frontend testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------- Database Dependency -------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ------------------- Reverse Geocoding -------------------
def reverse_geocode(lat: float, lon: float):
    url = f"https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lon}"
    try:
        response = requests.get(url, headers={"User-Agent": "FastAPI-App"})
        if response.status_code == 200:
            data = response.json()
            address = data.get("address", {})
            return {
                "city": address.get("city") or address.get("town") or address.get("village"),
                "country": address.get("country")
            }
    except Exception as e:
        print("Reverse geocoding failed:", e)
    return {"city": None, "country": None}

# ------------------- Weather Fetching -------------------
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")  # Set in environment

def get_weather(lat, lon):
    url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={OPENWEATHER_API_KEY}"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            # Rainfall in mm/h
            rainfall = data.get("rain", {}).get("1h") or data.get("rain", {}).get("3h") or 0.0

            return {
                "temperature": data["main"]["temp"],
                "description": data["weather"][0]["description"],
                "humidity": data["main"]["humidity"],
                "wind_speed": data["wind"]["speed"],
                "rainfall_mm_h": rainfall
            }
    except Exception as e:
        print("Weather fetch failed:", e)
    return {"error": "Could not fetch weather data"}

# ------------------- Routes -------------------

@app.get("/", response_class=HTMLResponse)
def serve_frontend():
    html_content = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Location & Weather Tracker</title>
    </head>
    <body>
      <h1>Location & Weather Tracker</h1>
      <button onclick="sendLocation()">Share My Location</button>

      <p id="status"></p>
      <pre id="location"></pre>
      <pre id="weather"></pre>

      <script>
        async function sendLocation() {
          if (!navigator.geolocation) {
            document.getElementById("status").innerText = "Geolocation not supported.";
            return;
          }

          document.getElementById("status").innerText = "Fetching location...";

          navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            document.getElementById("status").innerText = `Latitude: ${lat}, Longitude: ${lon}`;

            try {
              // Save location + weather
              const response = await fetch("/location/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ latitude: lat, longitude: lon })
              });
              const data = await response.json();
              document.getElementById("location").innerText = JSON.stringify(data, null, 2);

              // Fetch weather separately (optional)
              const weatherResp = await fetch(`/weather/?lat=${lat}&lon=${lon}`);
              const weatherData = await weatherResp.json();
              document.getElementById("weather").innerText = JSON.stringify(weatherData, null, 2);

            } catch (error) {
              document.getElementById("status").innerText = "Error fetching location or weather.";
              console.error(error);
            }
          }, (error) => {
            document.getElementById("status").innerText = "Error getting location: " + error.message;
          });
        }
      </script>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content)

@app.post("/location/")
async def save_location(request: Request, loc: LocationCreate, db: Session = Depends(get_db)):
    client_ip = request.client.host
    geo_data = reverse_geocode(loc.latitude, loc.longitude)
    weather_data = get_weather(loc.latitude, loc.longitude)

    new_location = Location(
        ip_address=client_ip,
        latitude=loc.latitude,
        longitude=loc.longitude,
        city=geo_data["city"],
        country=geo_data["country"],
        temperature=weather_data.get("temperature"),
        weather_description=weather_data.get("description"),
        humidity=weather_data.get("humidity"),
        wind_speed=weather_data.get("wind_speed"),
        rainfall_mm_h=weather_data.get("rainfall_mm_h")
    )

    db.add(new_location)
    db.commit()
    db.refresh(new_location)

    return {
        "message": "Location & weather stored successfully",
        "id": new_location.id,
        "city": geo_data["city"],
        "country": geo_data["country"],
        "weather": weather_data
    }

@app.get("/locations/")
def get_locations(db: Session = Depends(get_db)):
    return db.query(Location).all()

@app.get("/weather/")
def weather(lat: float = Query(...), lon: float = Query(...)):
    return get_weather(lat, lon)
