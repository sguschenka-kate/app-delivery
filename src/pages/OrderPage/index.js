import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

import mapStyles from './mapStyles';
import './style.scss'

const mapContainerStyle = {
  width: '100%',
  height: '100%',
}
const center = {
  lat: 50.464098755134145,
  lng: 0.49977330777314
}

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
}

function OrderPage() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps'

  return (
    <div className="map__container">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
      />
    </div>
  )
}

export {
  OrderPage
}