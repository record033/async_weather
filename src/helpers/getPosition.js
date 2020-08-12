export const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve(position);
    });
  });
};

export const fakeRequest = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const value = Math.random();
      if (value >= 0.5) {
        resolve(value);
      } else {
        reject(value);
      }
    }, 1000);
  });
};
