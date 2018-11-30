import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/app.scss';

import Header from './components/common/Header'
import Dashboard from './components/dashboard/Dashboard'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Погода'
    }
  };

  render() {
    return (
      <div className="App">
        <Header title={this.state.title} />
        <Dashboard />
      </div>
    );
  }
}

export default App;
