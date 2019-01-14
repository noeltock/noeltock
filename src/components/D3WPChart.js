import React, { Component } from "react";
import {
  XYPlot,
  LineSeries,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines
} from "react-vis";

const data = [
  {
    x: 2004,
    interest: 1,
    y: 1.0
  },
  {
    x: 2005,
    interest: 10,
    y: 2.0
  },
  {
    x: 2006,
    interest: 21,
    y: 3.4
  },
  {
    x: 2007,
    interest: 28,
    y: 5.0
  },
  {
    x: 2008,
    interest: 42,
    y: 6.4
  },
  {
    x: 2009,
    interest: 65,
    y: 8.2
  },
  {
    x: 2010,
    interest: 80,
    y: 10.5
  },
  {
    x: 2011,
    interest: 94,
    y: 13.1
  },
  {
    x: 2012,
    interest: 96,
    y: 15.8
  },
  {
    x: 2013,
    interest: 93,
    y: 17.4
  },
  {
    x: 2014,
    interest: 91,
    y: 21.0
  },
  {
    x: 2015,
    interest: 77,
    y: 23.3
  },
  {
    x: 2016,
    interest: 70,
    y: 25.6
  },
  {
    x: 2017,
    interest: 68,
    y: 27.3
  },
  {
    x: 2018,
    interest: 52,
    y: 29.2
  },
  {
    x: 2019,
    interest: 42,
    y: 32.7
  }
];

class d3WPChart extends Component {
  render() {
    return (
      <XYPlot height={300} width={700} xDomain={[2004, 2020]}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <LineSeries
          data={data}
          style={{
            strokeWidth: "3px"
          }}
          lineStyle={{ stroke: "red" }}
          markStyle={{ stroke: "blue" }}
          curve={"curveMonotoneX"}
        />
      </XYPlot>
    );
  }
}

export default d3WPChart;
