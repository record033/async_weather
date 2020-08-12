import React from "react";
import { getPosition } from "../../helpers/getPosition";
import { useDispatch, useSelector } from "react-redux";

export const WeatherCard = () => {
  const weatherDispatch = useDispatch();
  const weatherSelector = useSelector((state) => state);
  console.log(weatherSelector);

  const getWeather = async () => {
    const apiKey = "f6454c108a59e53bfb5611065f5cc6e9";
    try {
      console.log("Start getting data..");
      const position = await getPosition();
      const response = await fetch(
        "http://api.weatherstack.com/current?access_key=" +
          apiKey +
          "&query=" +
          position.coords.latitude +
          "," +
          position.coords.longitude
      );
      console.log(response);
      const currentWeather = await response.json();
      console.log(currentWeather);
      weatherDispatch({ type: "ADD_WEATHER_DATA", payload: currentWeather });
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <h1>async_weather</h1>
      <button onClick={getWeather}>log and dispatch</button>
      <div>
        {weatherSelector.weatherRecieved
          ? "Weather data: \n Time is " +
            weatherSelector.weatherData.current.observation_time +
            "\n Temperature is " +
            weatherSelector.weatherData.current.temperature +
            "\n "
          : "click to get data"}
      </div>
    </>
  );
};
