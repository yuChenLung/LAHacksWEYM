import React, { useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const Geocode = () => {
  const [location, setLocation] = useState('');
  const [latLng, setLatLng] = useState(null);
  const GOOGLE_MAPS_API_KEY = 'AIzaSyCuZ4iz7AYMcmdAoDoVzjVqB2g07gvGEf0';
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries
  });

  const handleInputChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSearchClick = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === 'OK') {
        const { lat, lng } = results[0].geometry.location;
        setLatLng({ lat: lat(), lng: lng() });
        console.log(lat)
        console.log(lng)
      } else {
        console.log(`Geocode was not successful for the following reason: ${status}`);
      }
    });
  };

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps...';

  return (
    <>
      <input type="text" value={location} onChange={handleInputChange} />
      <button onClick={handleSearchClick}>Search</button>
      {latLng && (
        <div>
          <p>Latitude: {latLng.lat}</p>
          <p>Longitude: {latLng.lng}</p>
        </div>
      )}
    </>
  );
};

export default Geocode;
