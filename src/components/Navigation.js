import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navigation extends Component {
  render() {
    return (
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about/">About</NavLink>
        <NavLink to="/built/">Built</NavLink>
        <NavLink to="/article/">Article</NavLink>
      </nav>
    );
  }
}

export default Navigation;
