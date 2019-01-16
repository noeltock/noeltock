import React, { Component } from "react";
import {
  FlexibleXYPlot,
  LineSeries,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines
} from "react-vis";
import { colors } from "./Colors";

const dataShare = [
  {
    x: 2004,
    y: 1.0 / 2
  },
  {
    x: 2005,
    y: 2.0
  },
  {
    x: 2006,
    y: 3.4
  },
  {
    x: 2007,
    y: 28,
    y: 5.0
  },
  {
    x: 2008,
    y: 6.4
  },
  {
    x: 2009,
    y: 8.2
  },
  {
    x: 2010,
    y: 10.5
  },
  {
    x: 2011,
    y: 13.1
  },
  {
    x: 2012,
    y: 15.8
  },
  {
    x: 2013,
    y: 17.4
  },
  {
    x: 2014,
    y: 21.0
  },
  {
    x: 2015,
    y: 23.3
  },
  {
    x: 2016,
    y: 25.6
  },
  {
    x: 2017,
    y: 27.3
  },
  {
    x: 2018,
    y: 29.2
  },
  {
    x: 2019,
    y: 32.7
  }
];

const shareMax = 100 / 33;

const dataInterest = [
  {
    x: 2004,
    y: 1 / shareMax
  },
  {
    x: 2005,
    y: 10 / shareMax
  },
  {
    x: 2006,
    y: 21 / shareMax
  },
  {
    x: 2007,
    y: 28 / shareMax
  },
  {
    x: 2008,
    y: 42 / shareMax
  },
  {
    x: 2009,
    y: 65 / shareMax
  },
  {
    x: 2010,
    y: 80 / shareMax
  },
  {
    x: 2011,
    y: 94 / shareMax
  },
  {
    x: 2012,
    y: 96 / shareMax
  },
  {
    x: 2013,
    y: 93 / shareMax
  },
  {
    x: 2014,
    y: 91 / shareMax
  },
  {
    x: 2015,
    y: 77 / shareMax
  },
  {
    x: 2016,
    y: 70 / shareMax
  },
  {
    x: 2017,
    y: 68 / shareMax
  },
  {
    x: 2018,
    y: 52 / shareMax
  },
  {
    x: 2019,
    y: 42 / shareMax
  }
];

class d3WPChart extends Component {
  render() {
    return (
      <div className="d3-chart-wpshare">
        <FlexibleXYPlot xDomain={[2004, 2020]} yDomain={[0, 35]}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis
            title="Year"
            tickFormat={v => parseInt(v)}
            style={{
              ticks: { fill: "#bbb", fontSize: 13 }
            }}
          />
          <YAxis
            title="WordPress Market Share"
            tickFormat={v => v + "%"}
            orientation="right"
            style={{
              title: { fill: colors.sec, fontWeight: 400, fontSize: 14 },
              ticks: { fill: colors.sec, fontSize: 13 }
            }}
            tickValues={[0, 5, 10, 15, 20, 25, 30, 35]}
          />
          <YAxis
            title="Consumer Interest"
            tickFormat={v => parseInt(v * shareMax)}
            orientation="left"
            style={{
              title: { fill: colors.pri, fontWeight: 400, fontSize: 14 },
              ticks: { fill: colors.pri, fontSize: 13 }
            }}
            tickValues={[0, 5, 10, 15, 20, 25, 30]}
          />
          <LineSeries
            data={dataShare}
            style={{
              stroke: colors.sec,
              strokeWidth: 3
            }}
            curve={"curveMonotoneX"}
          />
          <LineSeries
            data={dataInterest}
            style={{
              stroke: colors.pri,
              strokeWidth: 3
            }}
            curve={"curveMonotoneX"}
          />
        </FlexibleXYPlot>
      </div>
    );
  }
}

export default d3WPChart;
