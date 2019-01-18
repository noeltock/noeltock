import React, { Component } from "react";
import D3WPChart from "./D3WPChart";

class PageArticle extends Component {
  render() {
    return (
      <div className="content">
        <h1>WordPress is dead, long live WordPress.</h1>
        <p>
          Since the beginning of WordPress, success has largely been symbolised
          through market share, a number hovering around 33% today. All other
          contenders are under 3%, the dominance is real.
        </p>
        <p>
          I do however think that it is a deceiving number particularly because
          of how linear growth has been, implying in some ways that advances
          have been achieved through more of the same  —
          <em>
            more features, single site-owners, plugins, themes, WordCamps, etc
          </em>
          . Whilst they have certainly contributed to the journey, I do wonder
          if we're succumbing to casual narrative bias.
        </p>
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
        <D3WPChart />
        <p>
          Whilst the software has grown in adoption, it has become less relevant
          as a brand to the end-consumer. It's something I've certainly felt,
          but I just have one perspective of many. Why is that? Amongst the many
          reasons, I think three stand out:
        </p>
        <p>
          It was only yesterday that the WordPress ecosystem provided low
          barriers to entry and masses found an easy way out of their day jobs,
          becoming the web assemblers or blue collar workforce of WordPress.
          Today, WordPress is surrounded by a new wave of internet technology,
          workers are facing stiff price competition.
        </p>
        <p>VIZ CHART (OLD)</p>
        <p>The WordPress we used to know is dead.</p>
        <h2>What now?</h2>
        <p>VIZ CHART (NEW)</p>
        <p>Long live WordPress.</p>
      </div>
    );
  }
}

export default PageArticle;
