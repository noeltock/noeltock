import React, { Component } from "react";

class PostMeta extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="post-header">
        <h1>{this.props.title}</h1>
        <div className="post-meta">
          {this.props.modified !== this.props.date ? (
            <span className="modified">
              Updated on {this.props.modified},&nbsp;
            </span>
          ) : null}
          <span className="created">Posted {this.props.date}</span>
        </div>
      </div>
    );
  }
}

export default PostMeta;
