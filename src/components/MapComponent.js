import React, { useState, Fragment } from "react";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow
} from "@react-google-maps/api";

export default function MapComponent({places, center}) {
  // The things we need to track in state
  const [mapRef, setMapRef] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [zoom, setZoom] = useState(5);
  const [clickedLatLng, setClickedLatLng] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);

  // Load the Google maps scripts
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    // Enter your own Google Maps API key
    googleMapsApiKey: ""
  });

  // Iterate myPlaces to size, center, and zoom map to contain all markers
  const fitBounds = map => {
    const bounds = new window.google.maps.LatLngBounds();
    places.map(place => {
      bounds.extend(place.pos);
      return place.id;
    });
    map.fitBounds(bounds);
  };

  const loadHandler = map => {
    // Store a reference to the google map instance in state
    setMapRef(map);
    // Fit map bounds to contain all markers
    fitBounds(map);
  };

  // We have to create a mapping of our places to actual Marker objects
  const markerLoadHandler = (marker, place) => {
    return setMarkerMap(prevState => {
      return { ...prevState, [place.id]: marker };
    });
  };

  const markerClickHandler = (event, place) => {
    // Remember which place was clicked
    setSelectedPlace(place);

    // Required so clicking a 2nd marker works as expected
    if (infoOpen) {
      setInfoOpen(false);
    }

    setInfoOpen(true);

    // If you want to zoom in a little on marker click
    if (zoom < 13) {
      setZoom(13);
    }

    // if you want to center the selected Marker
    //setCenter(place.pos)
  };

  const renderMap = () => {
    return (
      <Fragment>
        <GoogleMap
          // Do stuff on map initial laod
          onLoad={loadHandler}
          // Save the user's map click position
          onClick={e => setClickedLatLng(e.latLng.toJSON())}
          center={center}
          zoom={zoom}
          mapContainerStyle={{
            height: "70vh",
            width: "100%"
          }}
        >
          {places.map(place => (
            <Marker
              key={place.id}
              position={place.pos}
              onLoad={marker => markerLoadHandler(marker, place)}
              onClick={event => markerClickHandler(event, place)}
              // Not required, but if you want a custom icon:
              icon={{
                path:
                  "M12.75 0l-2.25 2.25 2.25 2.25-5.25 6h-5.25l4.125 4.125-6.375 8.452v0.923h0.923l8.452-6.375 4.125 4.125v-5.25l6-5.25 2.25 2.25 2.25-2.25-11.25-11.25zM10.5 12.75l-1.5-1.5 5.25-5.25 1.5 1.5-5.25 5.25z",
                fillColor: "#0000ff",
                fillOpacity: 1.0,
                strokeWeight: 0,
                scale: 1.25
              }}
            />
          ))}

          {infoOpen && selectedPlace && (
            <InfoWindow
              anchor={markerMap[selectedPlace.id]}
              onCloseClick={() => setInfoOpen(false)}
            >
              <div>
                <h3>{selectedPlace.id}</h3>
                <div>This is your info window content</div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>

        {/* Our center position always in state */}
        <h3>
          Center {center.lat}, {center.lng}
        </h3>

        {/* Position of the user's map click */}
        {clickedLatLng && (
          <h3>
            You clicked: {clickedLatLng.lat}, {clickedLatLng.lng}
          </h3>
        )}

        {/* Position of the user's map click */}
        {selectedPlace && <h3>Selected Marker: {selectedPlace.id}</h3>}
      </Fragment>
    );
  };

  return isLoaded ? renderMap() : null;

}
