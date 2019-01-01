import React, { Component } from 'react';
import update from 'immutability-helper';
import * as d3 from 'd3';
import DeckGL, { ArcLayer, LinearInterpolator } from 'deck.gl';
import { StaticMap } from 'react-map-gl';
import 'mapbox-gl/src/css/mapbox-gl.css';

// API key
const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1Ijoibm9lbHRvY2siLCJhIjoiY2pwcGhidTJuMDI2eDN3b2EweHR1dWZzaCJ9.12aAGzu2My2Ymp7WBjbSKg';

// Initial Viewport
const transitionInterpolator = new LinearInterpolator(['bearing']);
const DECK_VIEW_STATE = {
  longitude: 0,
  latitude: 40,
  zoom: 3,
  minZoom: 3,
  maxZoom: 3,
  pitch: 50,
  bearing: 30,
  continuousWorld: false,
  noWrap: true,
};
const DECK_CONTROLS = {

}

const tileLayer = {
  continuousWorld: false,
  noWrap: true
}

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
    return [254, 127, 102, 120];
  } else {
    return [242, 111, 84, 120];
  }
}

let getDistance = (lat1, lon1, lat2, lon2) => {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;
  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}


class FlightsMap extends Component {
  // Set defaults
  constructor() {
    super(); // Runs component before extending
    this.rotationStep = 0;
    this.state = {
      flights: [],
      viewState: DECK_VIEW_STATE
    }

    this._onLoad = this._onLoad.bind(this);
    this._onViewStateChange = this._onViewStateChange.bind(this);
    this._rotateCamera = this._rotateCamera.bind(this);
  }

  _onLoad() {
    this._rotateCamera();
  }

  _onViewStateChange({viewState}) {
    this.setState({viewState});
  }

  _rotateCamera() {
    // change bearing by 120 degrees.
    const bearing = this.state.viewState.bearing - 120;
    this.setState({
      viewState: {
        ...this.state.viewState,
        bearing,
        transitionDuration: 40000,
        transitionInterpolator,
        onTransitionEnd: this._rotateCamera
      }
    });
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
    singleFlight.distance = getDistance(s['start_airport_latitude'], s['start_airport_longitude'], s['end_airport_latitude'], s['end_airport_longitude'])

    // Add Array to State
    const pastFlights = this.state.flights;
    let newFlights = update(pastFlights, {$push: [singleFlight]})
    this.setState({flights: newFlights})

    // Distance
    // console.log(this.state.flights.reduce((total, obj) => obj.distance + total,0))
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
          layers={layers}
          viewState={this.state.viewState}
          onLoad={this._onLoad}
          onViewStateChange={this._onViewStateChange}
          controller={DECK_CONTROLS}
        >
          <StaticMap
            mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox://styles/noeltock/cjqdnezwg010d2so0nrdgaj48"
            tileLayer={tileLayer}
          />
        </DeckGL>
      </div>
    );
  }
}

export default FlightsMap;
