// Core
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";

// Components
// import FlightsMap from "./components/FlightsMap";
import Navigation from "./components/Navigation";

//import Credits from "./components/Credits";

// Components - Pages
import PageHome from "./components/PageHome";
import PageAbout from "./components/PageAbout";
import PageBuilt from "./components/PageBuilt";
import Post from "./components/Post";
import PageArticle from "./components/PageArticle";
import Page404 from "./components/Page404";

// Other
import "./index.scss";
//import ntDuotone from "./img/nt-duotone.jpg";

// Google Analytics
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
        <Router>
          <div>
            <Navigation />
            <Switch>
              <Route path="/" exact component={PageHome} />
              <Route path="/about/" exact component={PageAbout} />
              <Route path="/built/" exact component={PageBuilt} />
              <Route path="/article/" exact component={PageArticle} />
              <Route path="/web-design/*" exact component={Post} />
              <Route path="/free-stuff/*" exact component={Post} />
              <Route path="/blog/*" exact component={Post} />
              <Route path="/portfolio/*" exact component={Post} />
              <Route path="/photography/*" exact component={Post} />
              <Route path="/seo/*" exact component={Post} />
              <Route path="/startup-snippets/*" exact component={Post} />
              <Route path="/remote-working/*" exact component={Post} />
              <Route path="/startups/*" exact component={Post} />
              <Route component={Page404} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
