import React from 'react';
import PropTypes from 'prop-types';

const getUpdateTime = date => {
  const hours = date
    .getHours()
    .toString()
    .padStart(2, '0');
  const minutes = date
    .getMinutes()
    .toString()
    .padStart(2, '0');

  return `${hours}:${minutes}`;
};

const CurrentWeatherDisplay = ({ weather, onRefresh }) => {
  return (
    <div className="current-weather-display">
      <div className="weather-location">{weather.location.name}</div>
      <div className="weather-min-max-temp">
        {weather.temperature.minimum}&deg; | {weather.temperature.maximum} &deg;
      </div>
      <div className="weather-current">
        <span className="current-temp">
          {weather.temperature.current} &deg;&nbsp;<sup>c</sup>
        </span>
      </div>
      <div className="weather-description">
        <div className="weather-icon">
          <img src={weather.icon} alt="icon" />
        </div>
        <div className="weather-condition">{weather.condition}</div>
      </div>
      <div className="weather-date">
        Обновлен в {getUpdateTime(weather.date)}
      </div>
      <i className="fas fa-sync-alt refresh fa-2x" onClick={onRefresh} />
    </div>
  );
};

CurrentWeatherDisplay.propTypes = {
  weather: PropTypes.object.isRequired,
  onRefresh: PropTypes.func.isRequired
};

export default CurrentWeatherDisplay;
