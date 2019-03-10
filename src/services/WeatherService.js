import axios from 'axios';

const OPEN_WEATHER_BASE_URL = 'http://api.openweathermap.org/data/2.5';
const OPEN_WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
const OPEN_WEATHER_IMG_URL = 'http://openweathermap.org/img/w';

const getWeather = url => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response && response.status === 200) {
          const { main, icon } = response.data.weather[0];
          const { temp, temp_min, temp_max } = response.data.main;
          const { lat, lon } = response.data.coord;
          const { dt, name } = response.data;
          resolve({
            condition: main,
            date: new Date(dt * 1000),
            icon: `${OPEN_WEATHER_IMG_URL}/${icon}.png`,
            location: {
              name: name,
              latitude: lat,
              longitude: lon
            },
            temperature: {
              current: parseInt(temp),
              minimum: parseInt(temp_min),
              maximum: parseInt(temp_max)
            }
          });
        } else {
          reject('Данные о погоде не найдены...');
        }
      })
      .catch(err => reject(err.message));
  });
};

const getDailyWeather = url => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response && response.status === 200) {
          const location = {
            name: response.data.city.name,
            latitude: response.data.coord.lat,
            longitude: response.data.coord.lon
          };

          const dailyForecasts = response.data.list.map(fc => {
            return {
              condition: fc.weather[0].description,
              date: new Date(fc.dt * 1000),
              icon: `${OPEN_WEATHER_IMG_URL}/${fc.weather[0].icon}.png`,
              location: location,
              temperature: {
                minimum: fc.main.temp_min,
                maximum: fc.main.temp_max
              }
            };
          });

          resolve(dailyForecasts);
        } else {
          reject('Данные о погоде не найдены...');
        }
      })
      .catch(err => reject(err.message));
  });
};

const getHourlyWeather = url => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response && response.status === 200) {
          const location = {
            name: response.data.city.name,
            latitude: response.data.coord.lat,
            longitude: response.data.coord.lon
          };

          const hourlyForecast = response.data.list.map(fc => {
            return {
              condition: fc.weather[0].description,
              date: new Date(fc.dt * 1000),
              icon: `${OPEN_WEATHER_IMG_URL}/${fc.weather[0].icon}.png`,
              location: location,
              temperature: {
                current: fc.main.temp
              }
            };
          });

          resolve(hourlyForecast);
        } else {
          reject('Данные о погоде не найдены...');
        }
      })
      .catch(err => reject(err.message));
  });
};

class WeatherService {
  getCurrentWeatherByPosition(city) {
    if (!city) throw Error('Название города обязательна');

    const url = `${OPEN_WEATHER_BASE_URL}/weather?appid=${OPEN_WEATHER_API_KEY}&q=${city}&units=metric`;
    return getWeather(url);
  }

  getDailyWeatherByPosition(city) {
    if (!city) throw Error('Название города обязательна');
    const url = `${OPEN_WEATHER_BASE_URL}/forecast/daily?appid=${OPEN_WEATHER_API_KEY}&q=${city}$units=metric&cnt=7`;
    return getDailyWeather(url);
  }

  getHourlyWeatherByPosition(city) {
    if (!city) throw Error('Название города обязательна');

    const url = `${OPEN_WEATHER_BASE_URL}/forecast?appid=${OPEN_WEATHER_API_KEY}&q=${city}&units=metric&cnt=12`;
    return getHourlyWeather(url);
  }
}

export { WeatherService };
