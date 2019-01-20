import React, { Component } from "react";
import { Helmet } from "react-helmet";
import SyntaxHighlighter from "react-syntax-highlighter";
import { arduinoLight } from "react-syntax-highlighter/dist/styles/hljs";
import TARS from "./Endurance";

const WP_API = "http://localhost:8888/wp-json/wp/v2/";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {}
    };
  }

  componentDidMount() {
    let slug = window.location.href
      .split("/")
      .filter(x => x !== "")
      .pop();
    fetch(WP_API + "posts?slug=" + slug)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(response => this.setState({ post: response[0] }));
  }

  render() {
    let display = "Loading";

    if ("title" in this.state.post) {
      let content = TARS.structuredContent(this.state.post.content.rendered);
      display = (
        <div className="post-content">
          <Helmet>
            <title>{this.state.post.title.rendered} | Noel Tock</title>
            <meta
              name="description"
              content="{this.state.post.excerpt.rendered}"
            />
            <meta property="og:type" content="article" />
          </Helmet>
          <p>Testing</p>

          <hr />
          <h1>{this.state.post.title.rendered}</h1>
          <p>Created: {TARS.prettyDate(this.state.post.date)}</p>
          <p>Modified: {TARS.prettyDate(this.state.post.modified)}</p>
          {content.map(x => {
            if (x.type == "shortcode") {
              return (
                <SyntaxHighlighter
                  key={x.id}
                  language={x.shortcode}
                  style={arduinoLight}
                  codeTagProps={{ className: "syntax" }}
                >
                  {x.content}
                </SyntaxHighlighter>
              );
            } else {
              return (
                <div
                  key={x.id}
                  dangerouslySetInnerHTML={{
                    __html: x.content
                  }}
                />
              );
            }
          })}
        </div>
      );
    }

    return <div className="wp-content">{display}</div>;
  }
}

export default Post;
