import React, { useState, useRef, useEffect } from 'react';
import { loadScript } from '@react-google-maps/api';


const Geocode = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const apiKey = AIzaSyCuZ4iz7AYMcmdAoDoVzjVqB2g07gvGEf0 ;
  
    loadScript({
      googleMapsApiKey: apiKey,
      libraries: ['places']
    })
      .then(() => {
        const geocoder = new window.google.maps.Geocoder();
        const addressAutocomplete = new window.google.maps.places.Autocomplete(addressRef.current);
        const cityAutocomplete = new window.google.maps.places.Autocomplete(cityRef.current);
  
        addressAutocomplete.setFields(['address_components', 'geometry']);
        cityAutocomplete.setFields(['address_components', 'geometry']);
  
        addressAutocomplete.addListener('place_changed', () => {
          const place = addressAutocomplete.getPlace();
  
          if (place && place.geometry) {
            const address = place.address_components
              .map(component => component.long_name)
              .join(', ');
  
            setAddress(address);
  
            geocoder.geocode({ address }, (results, status) => {
              if (status === 'OK' && results.length > 0) {
                const location = results[0].geometry.location;
                setLatitude(location.lat());
                setLongitude(location.lng());
              }
            });
          }
        });
  
        cityAutocomplete.addListener('place_changed', () => {
          const place = cityAutocomplete.getPlace();
  
          if (place && place.geometry) {
            const address = place.address_components
              .map(component => component.long_name)
              .join(', ');
  
            setCity(address);
  
            geocoder.geocode({ address }, (results, status) => {
              if (status === 'OK' && results.length > 0) {
                const location = results[0].geometry.location;
                setLatitude(location.lat());
                setLongitude(location.lng());
              }
            });
          }
        });
      });
  }, []);
  

  return (
    <div>
      <input type="text" ref={addressRef} value={address} onChange={(e) => setAddress(e.target.value)} />
      <input type="text" ref={cityRef} value={city} onChange={(e) => setCity(e.target.value)} />
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
    </div>
  );  
};

export default Geocode;
