import React, { Component } from 'react';
import modal from 'react-modal';

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

modal.setAppElement('#root');

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCurrentWeather: false,
      showDailyWeather: false,
      showHourlyWeather: false,
      modalIsOpen: false
    };
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div className="dashboard">
        <modal 
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="My modal"
        >
          <h1>123</h1>
        </modal>
        <div className="col-lg-6 mx-auto">
          <input type="button" onClick={this.openModal} value="Выбрать город" />
        </div>
      </div>
    )
  }
}

export default Dashboard;