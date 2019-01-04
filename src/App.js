import React, { Component } from 'react';
import Header from './components/Header';
import FlightsMap from './components/FlightsMap';
import Credits from './components/Credits';
import './index.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="split">
          <div className="col">
            <div className="content">
              <h2>About me</h2>
              <p>
                Building digital experiences since 1995. Grew from product
                design and developing SaaS/web applications — to building
                effective teams and bringing open-source to enterprise/big
                media. Everything that touches on CMS, DXP, headless, machine
                learning and intelligent/personalised experiences are the kind
                of projects we're working on. If that’s part of your digital
                strategy, I’d love to hear from you.
              </p>
            </div>
          </div>
          <div className="col">
            <FlightsMap />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
