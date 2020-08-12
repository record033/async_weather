import React from "react";
import { getPosition } from "../../helpers/getPosition";
import { useDispatch, useSelector } from "react-redux";

export const WeatherCard = () => {
  const weatherDispatch = useDispatch();
  const weatherSelector = useSelector((state) => state);
  console.log(weatherSelector);

  const getWeather = async () => {
    try {
      const response = await getPosition();
      console.log(response);
    } catch (error) {
      console.log("error", error);
    }

    const apiKey = "f6454c108a59e53bfb5611065f5cc6e9";
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
  };
  return (
    <>
      <h1>async_weather</h1>
      <button onClick={getWeather}>log and dispatch</button>
    </>
  );
};
