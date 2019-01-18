import React, { Component } from "react";

class Project extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>{this.props.project.name}</h3>
        <small>{this.props.project.years}</small>
        <p>{this.props.project.description}</p>
      </div>
    );
  }
}

export default Project;
