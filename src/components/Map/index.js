import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

import mapStyles from './mapStyles';
import './style.scss';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
}
const center = {
  lat: 50.46425108185003,
  lng: 30.49979118492588,
}

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
}

function Map(marker, className) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps';

  return (
    <div className={`map__container ${className}`}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
      >
        {Object.values(marker).map(marker => <Marker key={marker.lat} position={{ lat: marker.lat, lng: marker.lng }} /> &&
          <InfoWindow
            key={marker.lng}
            position={{ lat: marker.lat, lng: marker.lng }}>
            <div>
              We're here! 🍩
            </div>
          </InfoWindow>)}
      </GoogleMap>
    </div>
  )

}

export {
  Map
}