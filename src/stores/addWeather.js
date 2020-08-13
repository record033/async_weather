export const actions = {
  ADD_WEATHER_DATA: "ADD_WEATHER_DATA",
  UPDATE_WEATHER_DATA: "UPDATE_WEATHER_DATA",
};

const initialState = {
  weatherData: null,
  weatherRecieved: false,
};

export const WeatherReducer = (state, action) => {
  if (typeof state === "undefined") {
    return initialState;
  }

  switch (action.type) {
    case "ADD_WEATHER_DATA":
      return { ...state, weatherData: action.payload, weatherRecieved: true };

    case "UPDATE_WEATHER_DATA":
      return { ...state, weatherData: action.payload, weatherRecieved: true };

    default:
      break;
  }
};
