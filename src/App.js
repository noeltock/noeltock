import React, { Component } from "react";
import Header from "./components/Header";
import FlightsMap from "./components/FlightsMap";
import Credits from "./components/Credits";
import "./index.scss";
import ntDuotone from "./img/nt-duotone.jpg";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";

ReactGA.initialize("UA-40085355-1");
ReactGA.pageview(window.location.pathname + window.location.search);

// <img src={ntDuotone} alt="Logo" />
class App extends Component {
  render() {
    return (
      <div className="App">
        <Helmet>
          <html lang="en" />
          <meta charSet="utf-8" />
          <title>Noel Tock</title>
        </Helmet>
        <div className="split">
          <div className="col">
            <div className="content">
              <h1>Noel Tock</h1>
              <h2>About</h2>
              <p>
                I built my first website in 1995 and have watched the web grow
                since. I've enjoyed building products, digital nomadism, leading
                remote teams whilst remaining curious about what's next.
              </p>
              <h2>Current</h2>

              <h2>Past</h2>
              <p>
                Building digital experiences since 1995. Grew from product
                design and developing SaaS/web applications — to building
                effective teams and bringing open-source to enterprise/big
                media. <a href="#">Everything that touches</a> on CMS, DXP,
                headless, machine learning and intelligent/personalised
                experiences are the kind of projects we're working on. If that’s
                part of your digital strategy, I’d love to hear from you.
              </p>
              <p>
                <ul className="technologies">
                  <li className="f">Electron</li>
                  <li className="f">JavaScript</li>
                  <li className="f">React</li>
                  <li className="f">D3.js</li>
                  <li className="f">Node.js</li>
                  <li className="f">Express</li>
                  <li className="f">GraphQL</li>
                  <li className="b">scikit-learn</li>
                  <li className="b">Pandas</li>
                  <li className="b">TensorFlow.js</li>
                </ul>
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
