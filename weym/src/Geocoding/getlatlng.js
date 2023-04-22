import Geocode from 'react-geocode';

Geocode.setApiKey("AIzaSyDKRBWfalhNjmNjdIZ4zeA-UgFor764Vks");

async function getLatLng(address) {
    try {
        const response = await Geocode.fromAddress(address);
        const { lat, lng } = response.results[0].geometry.location;
        return { lat, lng };
    } catch (error) {
        console.error(error);
        return null;
    }
}
export default getLatLng;