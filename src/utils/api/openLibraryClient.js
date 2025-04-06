const axios = require("axios");

const baseURL = process.env.OPEN_LIBRARY_API || 'https://openlibrary.org';

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log('Open Library base API URL:', baseURL);

module.exports = apiClient;