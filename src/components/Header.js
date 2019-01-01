import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <div className="header-wrap block">
          <h2>
            Hi, I'm Noel&nbsp;
            <span role="img" aria-label="Waving">
              &#x1F44B;
            </span>
          </h2>
          <p>I enjoy building things.</p>
        </div>
      </header>
    );
  }
}

export default Header;

// <div className="header-headshot"></div>
