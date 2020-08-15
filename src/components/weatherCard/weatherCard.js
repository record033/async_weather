import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiKey } from "../../config";
//
import { getPosition } from "../../helpers/getPosition";
import { actionHandler } from "../../helpers/actionHandler";
import { WeatherCardWrapper } from "./styles";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Collapse from "react-bootstrap/Collapse";

export const WeatherCard = () => {
  const weatherDispatch = useDispatch();
  const weather = useSelector((state) => state);
  const [open, setOpen] = useState(false);

  const triggerCollapse = () => {
    setOpen(true);
  };

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
      console.log("Ready");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <WeatherCardWrapper>
        <Card
          bg="info"
          border="dark"
          text="light"
          style={{ width: "30vw" }}
          onClick={() => {
            getWeather();
            triggerCollapse();
          }}
        >
          <div style={{ maxWidth: "500px" }}>
            {weather.weatherData === null ? <p>Click to get weather</p> : null}
            <Collapse in={open}>
              {weather.weatherData === null && !weather.isLoading ? (
                <div> </div>
              ) : weather.isLoading && weather.weatherData === null ? (
                <div>
                  <Spinner animation="border" role="status" />
                </div>
              ) : (
                <div>
                  <p>Time is {weather.weatherData.time}</p>
                  <p>Temp is {weather.weatherData.temperature} deg</p>
                  <p>Humidity is {weather.weatherData.humidity}</p>
                  <p>
                    Now it is{" "}
                    {weather.weatherData.isDay === "yes" ? "daytime" : "night"}{" "}
                    and weather is {weather.weatherData.description}
                  </p>
                  <p>
                    Wind goes {weather.weatherData.wind.dir} with power of{" "}
                    {weather.weatherData.wind.speed}
                  </p>
                </div>
              )}
            </Collapse>
          </div>
        </Card>
      </WeatherCardWrapper>
    </>
  );
};
