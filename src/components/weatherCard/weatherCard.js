import React from "react";
import { getPosition } from "../../helpers/getPosition";
import { useDispatch, useSelector } from "react-redux";

export const WeatherCard = () => {
  const weatherDispatch = useDispatch();
  const weather = useSelector((state) => state);

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

      const rawWeatherData = await response.json();
      console.log(rawWeatherData);

      weatherDispatch({
        type: "ADD_WEATHER_DATA",
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
      <h1>async_weather</h1>
      <button onClick={getWeather}>log and dispatch</button>
      <div>
        {weather.weatherRecieved
          ? "Weather data: \n Time is " +
            weather.weatherData.time +
            "\n Temperature is " +
            weather.weatherData.temperature +
            "\n "
          : "click to get data"}
      </div>
    </>
  );
};
