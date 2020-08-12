import React from "react";
import "./App.css";
import { weatherStore } from "./stores/weatherStore";
import { WeatherCard } from "./components/weatherCard/weatherCard";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={weatherStore}>
      <div className="App">
        <WeatherCard />
      </div>
    </Provider>
  );
};

export default App;
