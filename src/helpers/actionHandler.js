export const actionHandler = (data) => {
  return {
    type: "WEATHER_ADD_DATA",
    payload: {
      time: data.observation_time,
      temperature: data.temperature,
      humidity: data.humidity,
      isDay: data.is_day,
      description: data.weather_descriptions,
      iconSrc: data.weather_icons,
      wind: {
        dir: data.wind_dir,
        speed: data.wind_speed,
      },
    },
  };
};
