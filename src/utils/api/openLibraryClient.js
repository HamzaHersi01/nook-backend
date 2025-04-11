const axios = require("axios");

const baseURL = process.env.OPEN_LIBRARY_API;
const coversBaseURL = process.env.OPEN_LIBRARY_COVERS_API;

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const coversApiClient = axios.create({
  baseURL: coversBaseURL,
  responseType: 'arraybuffer', // required to handle image binary
  headers: {
    'Accept': 'image/jpeg', // tells server we expect JPEG image
  },
});

console.log('Open Library base API URL:', baseURL);
console.log('Covers Open Library API url', coversBaseURL);

module.exports = {
  apiClient,
  coversApiClient
};
