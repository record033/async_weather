import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiKey } from "../../config";
//
import { getPosition } from "../../helpers/getPosition";
import { actionHandler } from "../../helpers/actionHandler";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";

export const WeatherCard = () => {
  const weatherDispatch = useDispatch();
  const weather = useSelector((state) => state);
  const [open, setOpen] = useState(false);

  const triggerCollapse = () => {
    setOpen(!open);
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
      <h1>Weather</h1>
      <Button
        variant="info"
        onClick={() => {
          getWeather();
          triggerCollapse();
        }}
      >
        click me
      </Button>
      <Card bg="info" border="dark" text="light" style={{ width: "35vw" }}>
        <div style={{ maxWidth: "300px" }}>
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
                <div src={weather.weatherData.iconSrc} />
              </div>
            )}
          </Collapse>
        </div>
      </Card>
    </>
  );
};
