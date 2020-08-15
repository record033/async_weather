import React from "react";
import { weatherStore } from "./stores/weatherStore";
import { WeatherCard } from "./components/weatherCard/weatherCard";
import { NavBar } from "./components/navbar/navbar";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { routes } from "./config";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Provider store={weatherStore}>
        <div className="App">
          <NavBar />
          <Switch>
            <Route path={routes.city} exact>
              <h2>query by city</h2>
            </Route>

            <Route path={routes.home} exact>
              <WeatherCard />
            </Route>
          </Switch>
        </div>
      </Provider>
    </Router>
  );
};

export default App;
