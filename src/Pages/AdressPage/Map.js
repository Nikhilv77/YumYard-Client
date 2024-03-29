import React, { useState, useEffect } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import PropTypes from "prop-types";
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const TOKEN =
  `${process.env.REACT_APP_MAPBOX_API}`;


Map.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  updateCoordinates: PropTypes.func.isRequired,
};

function Map({ longitude, latitude, updateCoordinates }) {
  const [viewport, setViewport] = useState({
    latitude ,
    longitude,
    zoom: 16,
  });

  const [markerKey, setMarkerKey] = useState(0);

  useEffect(() => {
    setViewport((oldViewport) => ({
      ...oldViewport,
      latitude,
      longitude,
    }));
    // Incrementing markerKey to force re-render of the Marker component
    setMarkerKey((prevKey) => prevKey + 1);
  }, [latitude, longitude]);

  const handleMarkerDrag = (event) => {
    const latitude = event.lngLat.lat;
    const longitude = event.lngLat.lng;

    updateCoordinates(latitude, longitude);
  };

  return (
    <div className="map-container">
      <ReactMapGl
        {...viewport}
        key={markerKey} // key to force re-render
        mapboxAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onMove={(event) => {
          setViewport(event.viewState);
        }}
      >
        <Marker
          key={markerKey} // key to force re-render
          latitude={latitude}
          longitude={longitude}
          draggable={true}
          onDragEnd={handleMarkerDrag}
        >
          <img className="marker" src="/pointer.svg" alt="marker" />
        </Marker>
      </ReactMapGl>
    </div>
  );
}

export default Map;

