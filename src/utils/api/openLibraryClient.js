const axios = require("axios");

// Load base URLs from environment variables
const baseURL = process.env.OPEN_LIBRARY_API;              // e.g., https://openlibrary.org
const coversBaseURL = process.env.OPEN_LIBRARY_COVERS_API; // e.g., https://covers.openlibrary.org
const googleBooksBaseURL = process.env.GOOGLE_BOOKS_API_URL; // e.g., https://www.googleapis.com/books/v1/volumes?q=

// Axios client for Open Library's JSON API (e.g., works, authors, etc.)
const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios client for Open Library's cover image API
const coversApiClient = axios.create({
  baseURL: coversBaseURL,
  responseType: 'arraybuffer', // Needed to handle binary image data
  headers: {
    'Accept': 'image/jpeg',
  },
});

// Axios client for Google Books API (e.g., to get extra metadata or descriptions)
const googleBooksApiClient = axios.create({
  baseURL: googleBooksBaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Debugging: log which base URLs are being used
console.log('Open Library base API URL:', baseURL);
console.log('Covers Open Library API url', coversBaseURL);

// Export all three API clients
module.exports = {
  apiClient,
  coversApiClient,
  googleBooksApiClient
};
