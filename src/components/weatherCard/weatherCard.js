import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
// Bootstrap
import { Card } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Collapse from "react-bootstrap/Collapse";
//Helpers
import { getPosition } from "../../helpers/getPosition";
import { actionHandler } from "../../helpers/actionHandler";
import * as Styles from "./styles";
//
import { apiKey } from "../../config";

export const WeatherCard = () => {
  const weatherDispatch = useDispatch();
  const { isLoading, weatherData } = useSelector((state) => state);
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleRequestWeather = useCallback(async () => {
    weatherDispatch({
      type: "WEATHER_TRIGGER_LOADING",
      payload: false,
    });

    try {
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
      console.error("error", error);
    }
  }, [weatherDispatch]);

  const handleCardClick = useCallback(() => {
    handleRequestWeather();
    handleOpen();
  }, [handleRequestWeather, handleOpen]);

  return (
    <>
      <Styles.WeatherCardWrapper>
        <Card
          bg="info"
          border="dark"
          text="light"
          style={{ width: "30vw" }}
          onClick={handleCardClick}
        >
          <div style={{ maxWidth: "500px" }}>
            {weatherData === null ? <p>Click to get weather</p> : null}
            <Collapse in={open}>
              {weatherData === null && !isLoading ? (
                <div> </div>
              ) : isLoading && weatherData === null ? (
                <div>
                  <Spinner animation="border" role="status" />
                </div>
              ) : (
                <div>
                  <p>Time is {weatherData.time}</p>
                  <p>Temp is {weatherData.temperature} deg</p>
                  <p>Humidity is {weatherData.humidity}</p>
                  <p>
                    Now it is {weatherData.isDay ? "daytime" : "night"} and
                    weather is {weatherData.description}
                  </p>
                  <p>
                    Wind goes {weatherData.wind.dir} with power of{" "}
                    {weatherData.wind.speed}
                  </p>
                </div>
              )}
            </Collapse>
          </div>
        </Card>
      </Styles.WeatherCardWrapper>
    </>
  );
};
