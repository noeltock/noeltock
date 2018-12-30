import React, { Component } from 'react';
import Header from './components/Header';
import FlightsMap from './components/FlightsMap';
import './index.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div>
          <p>
            Hi, my name is Noel 
            <span role="img" aria-label="Waving">
              &#x1F44B;
            </span>
          </p>
        </div>
        <FlightsMap />
      </div>
    );
  }
}

export default App;