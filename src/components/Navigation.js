import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";

class Navigation extends Component {
  render() {
    return (
      <nav>
        <Link to="/">Home</Link> | <Link to="/about/">About</Link>
      </nav>
    );
  }
}

export default Navigation;
