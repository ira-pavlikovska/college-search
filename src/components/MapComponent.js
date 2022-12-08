import React, { useState } from "react";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow
} from "@react-google-maps/api";

const school2place = (school) => {
  return {
    id: school['school.name'],
    pos: {
      lat: school['location.lat'],
      lng: school['location.lon']
    }
  }
}

export default function MapComponent({college}) {
  const places = [school2place(college)]
  const center=places[0].pos
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [infoOpen, setInfoOpen] = useState(false);

  // Load the Google maps scripts
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    // Enter your own Google Maps API key
    googleMapsApiKey: ""
  });


  // We have to create a mapping of our places to actual Marker objects
  const markerLoadHandler = (marker, place) => {
    return setMarkerMap(prevState => {
      return { ...prevState, [place.id]: marker };
    });
  };

  const markerClickHandler = (event, place) => {
    setSelectedPlace(place);
    if (infoOpen) {
      setInfoOpen(false);
    }
    setInfoOpen(true);
  };

  const renderMap = () => {
    return (
      <GoogleMap
        center={center}
        zoom={10}
        mapContainerStyle={{
          height: "90vh",
          width: "100%"
        }}
      >
        {places.map(place => (
          <Marker
            key={place.id}
            position={place.pos}
            onLoad={marker => markerLoadHandler(marker, place)}
            onClick={event => markerClickHandler(event, place)}
          />
        ))}

        {infoOpen && selectedPlace && (
          <InfoWindow
            anchor={markerMap[selectedPlace.id]}
            onCloseClick={() => setInfoOpen(false)}
          >
            <div>
              <h3>{selectedPlace.id}</h3>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  };

  return isLoaded ? renderMap() : null;
}
