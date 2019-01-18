import React, { Component } from "react";
import * as d3 from "d3";
// import { colors } from "./Colors";

// D3 Functions to manipulate attributes
let width = 720;
let height = 400;

let nodes = [
  {
    radius: 20
  },
  {
    radius: 10
  },
  {
    radius: 25
  },
  {
    radius: 10
  },
  {
    radius: 15
  }
];

let force = d3.layout
  .force()
  .nodes(nodes)
  .size([width, height])
  .gravity(5)
  .charge(5)
  .start();

// Graph Component

class d3WPForce extends Component {
  getInitialState() {}

  componentDidMount() {}

  updateData() {}

  render() {
    return (
      <div className="d3-force-wpshare">
        <div className="update" onClick={this.updateData}>
          Chart
        </div>
      </div>
    );
  }
}

export default d3WPForce;
