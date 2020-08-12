export const actions = {
  ADD_WEATHER_DATA: "ADD_WEATHER_DATA",
  UPDATE_WEATHER_DATA: "UPDATE_WEATHER_DATA",
};

export const WeatherReducer = (state, action) => {
  switch (action.type) {
    case "ADD_WEATHER_DATA":
      return { ...state, weatherData: action.payload, weatherRecieved: true };

    case "UPDATE_WEATHER_DATA":
      return { ...state, weatherData: action.payload, weatherRecieved: true };

    default:
      break;
  }
};
