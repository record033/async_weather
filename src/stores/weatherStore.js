import { createStore } from "redux";
import { WeatherReducer } from "./addWeather";

export const weatherStore = createStore(WeatherReducer, {
  weather: "Unknown",
});
