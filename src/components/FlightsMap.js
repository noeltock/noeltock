import React, { Component } from 'react';
import update from 'immutability-helper';
import * as d3 from 'd3';
import DeckGL, { ArcLayer } from 'deck.gl';
import { StaticMap } from 'react-map-gl';
import 'mapbox-gl/src/css/mapbox-gl.css';

// API key
const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1Ijoibm9lbHRvY2siLCJhIjoiY2pwcGhidTJuMDI2eDN3b2EweHR1dWZzaCJ9.12aAGzu2My2Ymp7WBjbSKg';

// Initial Viewport
const initialViewState = {
  longitude: 8.55,
  latitude: 20,
  zoom: 1,
  minZoom: 1,
  maxZoom: 4,
  pitch: 45,
  bearing: 10
};

let checkStartEnd = segment => {
  if (
    segment.hasOwnProperty('start_airport_latitude') &&
    segment.hasOwnProperty('end_airport_latitude')
  ) {
    return true;
  } else {
    return false;
  }
};

let checkHome = code => {
  if (code === 'ZRH') {
    return [254, 127, 102, 255];
  } else {
    return [242, 111, 84, 255];
  }
}


class FlightsMap extends Component {
  // Set defaults
  constructor() {
    super();
    this.state = {
      flights: []
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  createFlight = (s, i) => {

    // Construct Flight Array
    let singleFlight = []
    singleFlight.from = []
    singleFlight.from.name = s['start_airport_code'];
    singleFlight.from.coordinates = [
      Number(s['start_airport_longitude']),
      Number(s['start_airport_latitude'])
    ];
    singleFlight.from.color = checkHome(s['start_airport_code'])
    singleFlight.to = [];
    singleFlight.to.name = s['end_airport_code'];
    singleFlight.to.coordinates = [
      Number(s['end_airport_longitude']),
      Number(s['end_airport_latitude'])
    ];
    singleFlight.to.color = checkHome(s['end_airport_code'])

    // Add Array to State
    const pastFlights = this.state.flights;
    let newFlights = update(pastFlights, {$push: [singleFlight]})
    this.setState({flights: newFlights})

  };

  fetchData = () => {
    d3.json('./data/response.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(data => {
      let counter = 0;
      let runningFlights = []
      for (let t in data['AirObject']) {
        let s = data['AirObject'][t]['Segment'];
        if (typeof s['start_airport_code'] !== 'undefined') {
          if (checkStartEnd(s)) {
            counter++;
            this.createFlight(s, counter);

          }
        } else {
          for (let f in s) {
            if (checkStartEnd(s[f])) {
              counter++;
              this.createFlight(s[f], counter);
            }
          }
        }
      }
      this.setState({flight: runningFlights})
    });
  }

  render() {
    const layers = [
      new ArcLayer({
        id: 'flight-map',
        data: this.state.flights,
        pickable: true,
        getStrokeWidth: 3,
        getSourcePosition: d => d['from']['coordinates'],
        getTargetPosition: d => d['to']['coordinates'],
        getTargetColor: d => d['to']['color'], // 
        getSourceColor: d => d['from']['color']
      })
    ];

    return (
      <div className="flight-map-wrap">
        <DeckGL
          height={600}
          initialViewState={initialViewState}
          layers={layers}
          baseMap={true}
          controller={true}
        >
          <StaticMap
            mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox://styles/mapbox/light-v9"
          />
        </DeckGL>
      </div>
    );
  }
}

export default FlightsMap;
