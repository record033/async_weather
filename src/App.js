import React from "react";
import "./App.css";

const App = () => {
  const getGeoWeather = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const apiKey = "f6454c108a59e53bfb5611065f5cc6e9";
      console.log(position);
      const { latitude, longitude } = position.coords;
      const response = await fetch(
        "http://api.weatherstack.com/current?access_key=" +
          apiKey +
          "&query=" +
          latitude +
          "," +
          longitude
      );
      console.log(response);
      const CurrentWeather = await response.json();
      console.log(CurrentWeather);
    });
  };

  return (
    <div className="App">
      <h1>async_weather</h1>
      <button onClick={getGeoWeather}>test</button>
    </div>
  );
};

export default App;
