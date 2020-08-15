export const actionHandler = (data) => {
  const { current } = data;
  return {
    type: "WEATHER_ADD_DATA",
    payload: {
      time: current.observation_time,
      temperature: current.temperature,
      humidity: current.humidity,
      isDay: "yes" ? true : false,
      description: current.weather_descriptions,
      iconSrc: current.weather_icons,
      wind: {
        dir: current.wind_dir,
        speed: current.wind_speed,
      },
    },
  };
};
