// Core
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";

// Components
import Navigation from "./components/Navigation";
//import Header from "./components/Header";
import FlightsMap from "./components/FlightsMap";
//import Credits from "./components/Credits";

// Components - Pages
import PageHome from "./components/PageHome";
import PageAbout from "./components/PageAbout";

// Other
import "./index.scss";
//import ntDuotone from "./img/nt-duotone.jpg";

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
            <Router>
              <div>
                <Navigation />
                <Route path="/" exact component={PageHome} />
                <Route path="/about/" exact component={PageAbout} />
              </div>
            </Router>
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
