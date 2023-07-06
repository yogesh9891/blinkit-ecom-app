import axios from 'axios';

let apiKey = 'AIzaSyBQ3hIdYYiD2NX-6uSuDn9-X37NHlgNU0M'
export const getLocationString = async (latitude, logitude) => {
  return await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${logitude}&key=${apiKey}`);
};

export const placesAutoComplete = async value => {
  return await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&types=establishment&components=country:in&key=${apiKey}`);
};

export const getLocationByAddressString = async address => {
  return await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`);
};
