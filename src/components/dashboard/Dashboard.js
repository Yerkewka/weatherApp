import React, { Component } from 'react';
import Modal from 'react-modal';
import { GeolocationService } from '../../services/GeolocationService';
import { WeatherService } from '../../services/WeatherService';
import CurrentWeatherDisplay from '../weather/CurrentWeatherDisplay';

// Инициируем сервисы
const geolocationService = new GeolocationService();
const weatherService = new WeatherService();

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%,-50%)'
  }
};

Modal.setAppElement('#root');

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCurrentWeather: false,
      showDailyWeather: false,
      showHourlyWeather: false,
      modalIsOpen: false,
      city: '',
      weather: null
    };
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  handleFormSubmit = async e => {
    e.preventDefault();

    const { city } = this.state;
    // const { lat, lng } = await geolocationService.getCityPosition(city);
    const weather = await weatherService.getCurrentWeatherByPosition(city);
    this.setState({ weather, showCurrentWeather: true, modalIsOpen: false });
  };

  handleCurrentRefresh = async () => {
    const { city } = this.state;
    const weather = await weatherService.getCurrentWeatherByPosition(city);
    this.setState({ weather });
  };

  handleChangeCity = e => {
    this.setState({ city: e.target.value });
  };

  render() {
    const { city, weather, showCurrentWeather } = this.state;

    return (
      <div className="dashboard">
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="My modal"
        >
          <h3 className="text-center mb-3">Внимание</h3>
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="city">Название города на английском</label>
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={this.handleChangeCity}
                className="form-control"
              />
            </div>
          </form>
        </Modal>
        <div className="col-lg-6 mx-auto">
          <input
            type="button"
            onClick={this.openModal}
            value="Ввести название города"
            className="btn btn-primary mb-4"
          />

          {showCurrentWeather && (
            <CurrentWeatherDisplay
              weather={weather}
              onRefresh={this.handleCurrentRefresh}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
