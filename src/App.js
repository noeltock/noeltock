import React, { Component } from 'react';
import Header from './components/Header';
import FlightsMap from './components/FlightsMap';
import Credits from './components/Credits';
import './index.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div>
          <p>

          </p>
        </div>
        <FlightsMap />
        <Credits />
      </div>
    );
  }
}

export default App;