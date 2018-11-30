import React, { Component } from 'react'

class Header extends Component {
  render() {
    const { title } = this.props; 

    return (
      <div className="header">
        <div className="navbar navbar-light bg-dark">
          <div className="container">
            <div className="brand">
              <i className="brand-icon fas fa-sun fa-2x"></i>
              <span className="brand-text">{title}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;