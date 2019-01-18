import React, { Component } from "react";
import Project from "./Project";

let projects = [
  {
    name: "Happytables",
    years: "2004-2008",
    description:
      "SaaS Platform whereby restaurants can connect their various applications (POS, labour, ordering, social, etc.) to generate actionable insights and make smarter decisions impacting profitability and operating expenses.",
    image: ""
  },
  {
    name: "Nomadbase",
    years: "",
    description:
      "A real-time map of Digital Nomads utilising various social API's. Even though it's still early, it already has well over half a million data points.",
    image: ""
  },
  {
    name: "Project Reality",
    years: "2004-2008",
    description: "Part of the Human Made Journey",
    image:
      "#1 Battlefield Mod & Mod of the Year ModDB.com. Community-powered modification for the Battlefield franchise as well as ARMA in later years. Started in 2004, and I personally retired from the project in 2008. It still thrives today."
  },
  {
    name: "Game Artist",
    years: "",
    description:
      "Sold to CG-Society in 2007 - One of the first communities built for professional computer & video game artists. Interviews, tutorials, etc. all built using vBulletin.",
    image: ""
  }
];

class PageHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: projects
    };
  }

  render() {
    return (
      <div className="content">
        <div className="content">
          <h1>Noel Tock</h1>
          <p>
            I built my first website in 1995 and have watched the web grow
            since. I&apos;ve enjoyed building products, digital nomadism,
            leading remote teams whilst remaining curious about what&apos;s
            next.
          </p>
          <p>
            These days I'm focused on various web and emerging technologies.
            I've recently had the chance to experiment with these tecnologies.
          </p>
          <ul className="technologies">
            <li className="f">Electron</li>
            <li className="f">JavaScript</li>
            <li className="f">React</li>
            <li className="f">D3.js</li>
            <li className="f">Node.js</li>
            <li className="f">Express</li>
            <li className="f">GraphQL</li>
            <li className="b">scikit-learn</li>
            <li className="b">Pandas</li>
            <li className="b">TensorFlow.js</li>
          </ul>
          <h2>Past</h2>
          <div>
            {this.state.portfolio.map((item, i) => {
              return <Project key={i} project={item} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default PageHome;
