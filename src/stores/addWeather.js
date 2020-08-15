export const actions = {
  WEATHER_ADD_DATA: "WEATHER_ADD_DATA",
  WEATHER_TRIGGER_LOADING: "WEATHER_TRIGGER_LOADING",
};

const initialState = {
  weatherData: null,
  isLoading: false,
};

export const WeatherReducer = (state, action) => {
  if (typeof state === "undefined") {
    return initialState;
  }

  switch (action.type) {
    case "WEATHER_ADD_DATA":
      return { ...state, weatherData: action.payload, isLoading: false };

    case "WEATHER_TRIGGER_LOADING":
      return { ...state, weatherData: null, isLoading: true };

    default:
      break;
  }
};
