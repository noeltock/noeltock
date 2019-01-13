// Core
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// Components
import FlightsMap from "./components/FlightsMap";
import Navigation from "./components/Navigation";
//import Credits from "./components/Credits";

// Components - Pages
import PageHome from "./components/PageHome";
import PageAbout from "./components/PageAbout";
import PageBuilt from "./components/PageBuilt";
import Page404 from "./components/Page404";

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
                <TransitionGroup>
                  <CSSTransition
                    timeout={{ enter: 300, exit: 300 }}
                    classNames={"fade"}
                  >
                    <Switch location={location}>
                      <Route path="/" exact component={PageHome} />
                      <Route path="/about/" exact component={PageAbout} />
                      <Route path="/built/" exact component={PageBuilt} />
                      <Route component={Page404} />
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
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
