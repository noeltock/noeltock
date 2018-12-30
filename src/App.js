import React, { Component } from 'react';
import './index.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="header-wrap">
            <div className="header-headshot"></div>  
          </div>
        </header>
        <div>
          <p>Hi, my name is Noel <span role="img" aria-label="Snowman">👋</span></p>
        </div>
      </div>
    );
  }
}

export default App;