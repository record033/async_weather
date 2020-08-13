import React from "react";
import { getPosition } from "../../helpers/getPosition";
import { actionHandler } from "../../helpers/actionHandler";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, WeatherCardWrapper } from "./styles";
import { apiKey } from "../../config";

export const WeatherCard = () => {
  const weatherDispatch = useDispatch();
  const weather = useSelector((state) => state);

  const getWeather = async () => {
    weatherDispatch({
      type: "WEATHER_TRIGGER_LOADING",
      payload: false,
    });

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

      const rawWeatherData = await response.json();
      weatherDispatch(actionHandler(rawWeatherData));
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <h1>Weather</h1>
      <button onClick={getWeather}>click me</button>
      <WeatherCardWrapper>
        {weather.weatherData === null && !weather.isLoading  ? (
          <p>click to load data </p>
        ) : weather.isLoading && weather.weatherData === null ? (
          <Spinner />
        ) : (
          <>
            <p>Time is {weather.weatherData.time}</p>
            <p>Temp is {weather.weatherData.temperature} deg</p>
          </>
        )}
      </WeatherCardWrapper>
    </>
  );
};
