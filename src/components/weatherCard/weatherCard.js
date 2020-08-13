import React from "react";
import { getPosition } from "../../helpers/getPosition";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, WeatherCardWrapper } from "./styles";

export const WeatherCard = () => {
  const weatherDispatch = useDispatch();
  const weather = useSelector((state) => state);

  const getWeather = async () => {
    weatherDispatch({
      type: "SET_LOADING_TRUE",
      weatherRecieved: false,
    });
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

      const rawWeatherData = await response.json();
      console.log(rawWeatherData);

      weatherDispatch({
        type: "ADD_WEATHER_DATA",
        isLoading: true,
        payload: {
          time: rawWeatherData.current.observation_time,
          temperature: rawWeatherData.current.temperature,
          humidity: rawWeatherData.current.humidity,
          isDay: rawWeatherData.current.is_day,
          description: rawWeatherData.current.weather_descriptions,
          iconSrc: rawWeatherData.current.weather_icons,
          wind: {
            dir: rawWeatherData.current.wind_dir,
            speed: rawWeatherData.current.wind_speed,
          },
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log(weather);
  return (
    <>
      <h1>Weather</h1>
      <button onClick={getWeather}>click me</button>
      <WeatherCardWrapper>
        {weather.weatherRecieved ? (
          <>
            <p>Time is {weather.weatherData.time}</p>
            <p>Temp is {weather.weatherData.temperature} deg</p>
          </>
        ) : weather.weatherRecieved === false && weather.isLoading ? (
          <Spinner />
        ) : (
          <p>click to load</p>
        )}
      </WeatherCardWrapper>
    </>
  );
};
