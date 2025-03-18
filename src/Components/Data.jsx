import { useState } from "react";

const Data = () => {
  const [city, setCity] = useState(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);

  const fetchApi = async () => {
    const api = "2ec9d158b46290388eb86cf30a4efac6";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${api}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const jsonResponse = await response.json();
      setCity(jsonResponse);
      setError(null);
    } catch (error) {
      setError("There is something wrong");
      setCity(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchApi();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-auto bg-gradient-to-r from-blue-400 to-blue-600 p-6">
      <h1 className="text-4xl font-bold text-white mb-6">🌍 Weather App</h1>

      <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center gap-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter city name"
          className="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          onClick={fetchApi}
          className="w-full py-2 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition">
          🔍 Search
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {city && (
        <div className="mt-6 bg-white p-6 rounded-2xl shadow-md w-full max-w-md flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            {city.name}
          </h2>

          {/* Weather Icon */}
          <img
            src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
            alt="weather icon"
            className="w-24 h-24"
          />
          <p className="text-center text-gray-500 capitalize">
            {city.weather[0].description}
          </p>

          <div className="mt-4 flex justify-between items-center text-gray-700 w-full px-4">
            <div className="text-center">
              <p className="text-3xl font-bold">
                🌡 {Math.round(city.main.temp - 273.15)}°C
              </p>
              <p className="text-sm">Temperature</p>
            </div>
            <div className="text-center">
              <p className="text-xl">💨 {city.wind.speed} Km/h</p>
              <p className="text-sm">Wind Speed</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 text-center text-gray-600">
            <p>🌫 Humidity: {city.main.humidity}%</p>
            <p>📏 Pressure: {city.main.pressure} mb</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Data;
