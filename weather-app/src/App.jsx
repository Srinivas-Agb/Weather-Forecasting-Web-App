import { useState } from "react";
import './App.css'

function App() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const key = "533b0ca3211753b026f7f2b01c7a2ce3";

  const handleTemp = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
      );
      const data = await response.json();

      if (response.ok) {
        const celcius = data.main.temp;
        setResult(`Temperature at ${city} is ${Math.round(celcius)} °C`);
      } else {
        setError("City not found. Please enter a valid city.");
      }
    } catch (err) {
      setError("Failed to fetch weather data. Please try again later.");
    } finally {
      setLoading(false);
      setCity("");
    }
  };

  return (
    <center>
      <h2>Weather Forecast</h2>
      <form onSubmit={handleTemp}>
        <input
          type="text"
          value={city}
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
        />
        <br /><br />
        <button disabled={!city.trim() || loading}>
          {loading ? "Loading..." : "Get Temperature"}
        </button>
        <h3 style={{ color: "green" }}>{result}</h3>
        <h4 style={{ color: "red" }}>{error}</h4>
      </form>
    </center>
  );
}

export default App;
