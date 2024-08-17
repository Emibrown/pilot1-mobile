import axios from 'axios';
import {GOOGLE_API_KEY} from '@env';

const FIND_PLACE_BASE_URL = 'https://maps.googleapis.com/maps/api';

// Gro code Filter type
export const geoCodeFilter = [
  'street_address',
  'establishment',
  // 'point_of_interest',
  'route',
] as const;

export type geoCodeFilterType = (typeof geoCodeFilter)[number];

// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452

const placeApiClient = axios.create({
  baseURL: FIND_PLACE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // You can add other headers like authorization token here
  },
});

const getPlace = (text: string, latLng?: string, config = {}) => {
  let url = '';
  if (latLng) {
    url = `/place/autocomplete/json?key=${GOOGLE_API_KEY}&input=${text}&components=country:ng&locationbias=circle:20@${latLng}`;
  } else {
    url = `/place/autocomplete/json?key=${GOOGLE_API_KEY}&input=${text}&components=country:ng`;
  }
  return placeApiClient.get(url, config);
};

const getPlaceDetails = (placeId: string, config = {}) => {
  const url = `/place/details/json?key=${GOOGLE_API_KEY}&place_id=${placeId}&fields=geometry,formatted_address`;
  return placeApiClient.get(url, config);
};

const getGeoCode = (
  lat: number,
  lng: number,
  filter?: geoCodeFilterType,
  config = {},
) => {
  let url = '';
  if (filter) {
    url = `/geocode/json?key=${GOOGLE_API_KEY}&latlng=${lat},${lng}&result_type=${filter}`;
  } else {
    url = `/geocode/json?key=${GOOGLE_API_KEY}&latlng=${lat},${lng}`;
  }
  return placeApiClient.get(url, config);
};

// Export API methods
export {getPlace, getPlaceDetails, getGeoCode};
