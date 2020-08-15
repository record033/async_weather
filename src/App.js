import React from "react";
import "./App.css";
import { weatherStore } from "./stores/weatherStore";
import { WeatherCard } from "./components/weatherCard/weatherCard";
import { NavBar } from "./components/navbar/navbar";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Provider store={weatherStore}>
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route path="/city">
              <h2>query by city</h2>
            </Route>

            <Route path="/">
              <WeatherCard />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
