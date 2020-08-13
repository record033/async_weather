export const actions = {
  ADD_WEATHER_DATA: "ADD_WEATHER_DATA",
  SET_LOADING_TRUE: "SET_LOADING_TRUE",
};

const initialState = {
  weatherData: null,
  weatherRecieved: false,
  isLoading: false,
};

export const WeatherReducer = (state, action) => {
  if (typeof state === "undefined") {
    return initialState;
  }

  switch (action.type) {
    case "ADD_WEATHER_DATA":
      return { ...state, weatherData: action.payload, weatherRecieved: true };

    case "SET_LOADING_TRUE":
      return { ...state, weatherData: null, isLoading: true };

    default:
      break;
  }
};
