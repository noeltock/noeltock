import React, { Component } from 'react';
import * as d3 from 'd3';
import DeckGL, { ArcLayer } from 'deck.gl';
import { StaticMap, NavigationControl } from 'react-map-gl';

// API key
const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1Ijoibm9lbHRvY2siLCJhIjoiY2pwcGhidTJuMDI2eDN3b2EweHR1dWZzaCJ9.12aAGzu2My2Ymp7WBjbSKg';

// Initial Viewport
const initialViewState = {
  longitude: 8.55,
  latitude: 20,
  zoom: 2,
  minZoom: 2,
  maxZoom: 4,
  pitch: 45,
  bearing: 10
};

class FlightsMap extends Component {
  // Set defaults
  constructor() {
    super();
    this.state = {
      flights: [
        {
          from: {
            name: 'ZRH',
            coordinates: [8.55, 47.36667]
          },
          to: {
            name: 'DXB',
            coordinates: [55.296249, 25.276987]
          }
        }
      ]
    };
  }

  render() {
    const layers = [
      new ArcLayer({
        id: 'flights',
        data: this.state.flights,
        pickable: true,
        getStrokeWidth: 3,
        getSourcePosition: d => d.from.coordinates,
        getTargetPosition: d => d.to.coordinates,
        getTargetColor: [18, 61, 112, 255],
        getSourceColor: [254, 127, 102, 255]
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
          >
            <div style={{ position: 'absolute', right: 5, top: 5 }}>
              <NavigationControl />
            </div>
          </StaticMap>
        </DeckGL>
      </div>
    );
  }
}

export default FlightsMap;
