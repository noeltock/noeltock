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
          the same  —
          <em>
            more features, single site-owners, plugins, themes, WordCamps, etc
          </em>
          . Whilst that's certainly part of the journey, I do wonder if we're
          succumbing to casual narrative bias.
        </p>
        <D3WPChart />
        <p>
          It's hard to find great data for WordPress as a whole . Between
          WordPress.org, WordPress.com, WooCommerce, Jetpack, it's a very
          confusing ecosystem as the WordPress brand is blurred between
          open-source and commercial endeavours. I do find Google Trends to be a
          good indicator of the things that interest consumers at large - it's
          interesting to see that here overall popularity has dropped quite a
          bit since it peaked in 2012 (when market share was half of what it is
          today).
        </p>
        <p>
          Whilst the software has grown in adoption, it has become less relevant
          as a brand to the end-consumer.
        </p>
        <p>
          It was only yesterday that the WordPress ecosystem provided low
          barriers to entry and masses found an easy way out of their day jobs,
          becoming the web assemblers or blue collar workforce of WordPress.
          Today, WordPress is surrounded by a new wave of internet technology,
          workers are facing stiff price competition.
        </p>
        <p>The WordPress we used to know is dead.</p>
      </div>
    );
  }
}

export default PageArticle;
