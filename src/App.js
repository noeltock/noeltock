import React, { Component } from 'react';
import Header from './components/Header';
import FlightsMap from './components/FlightsMap';
import Credits from './components/Credits';
import './index.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FlightsMap />
        {/* <Header />
        <div>
          <p>

          </p>
        </div>
        <Credits />  */}
      </div>
    );
  }
}

export default App;