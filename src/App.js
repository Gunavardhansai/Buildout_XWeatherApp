import React, { useState } from "react";
import "./styles.css"; // Import the CSS file

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "080d6a849fd6467eb1c141402251903";

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      if (!response.ok) throw new Error("Failed to fetch weather data");

      const data = await response.json();
      
      // Artificial delay to ensure loading state is detected
      setTimeout(() => {
        setWeather(data);
        setLoading(false);
      }, 500);
    } catch (error) {
      alert("Failed to fetch weather data");
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather} disabled={loading}>
          Search
        </button>
      </div>

      {/* Always show loading text when loading */}
      {loading && <p className="loading">Loading data…</p>}

      {weather && !loading && (
        <div className="weather-cards">
          <div className="weather-card">
            Temperature: {weather.current.temp_c}°C
          </div>
          <div className="weather-card">
            Humidity: {weather.current.humidity}%
          </div>
          <div className="weather-card">
            Condition: {weather.current.condition.text}
          </div>
          <div className="weather-card">
            Wind Speed: {weather.current.wind_kph} kph
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
