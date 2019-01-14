import React, { Component } from "react";
import D3WPChart from "./D3WPChart";

class PageArticle extends Component {
  render() {
    return (
      <div className="content">
        <h1>WordPress is dead, long live WordPress.</h1>
        <p>
          Since the beginning of WordPress, success has largely been validated
          through market share, a number hovering around 32% today. It's a
          deceiving number particularly because of how linear growth has been,
          implying in some ways that advances have been achieved through more of
          the same - more features, single site-owners, plugins, themes,
          WordCamps, etc. Whilst that's certainly part of the journey, I think
          the undercurrent is shifting in more subtle ways.
        </p>
        <D3WPChart />
        <p>
          It's hard to find great data for WordPress as a whole - between
          WordPress.org, WordPress.com, WooCommerce, Jetpack, it's a very
          confusing ecosystem as the WordPress brand is blurred between
          open-source and commercial endeavours. I do find Google Trends to be a
          good indicator of the things that interest consumers at large - it's
          interesting to see that here overall popularity has dropped quite a
          bit since it peaked in 2012 (when market share was half of what it is
          today).
        </p>
      </div>
    );
  }
}

export default PageArticle;
