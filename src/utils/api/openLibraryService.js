const { coversApiClient } = require("./openLibraryClient");
const { apiClient } = require("./openLibraryClient");
const { googleBooksApiClient } = require("./openLibraryClient");

// Fetch a book's base metadata using ISBN from Open Library
const getBookByIsbnFromOpenLib = async (isbn) => {
  const url = `/isbn/${isbn}.json`;
  console.log('Full URL:', apiClient.defaults.baseURL + url); // Debug log
  const res = await apiClient.get(url);
  return res.data;
};

// Search for books in Open Library by title (uses /search.json)
const searchOpenLibForBook = async (searchItem) => {
  const formattedQuery = searchItem.replace(/ /g, '+'); // Convert spaces to '+'
  const url = `/search.json?title=${formattedQuery}`;
  console.log('Full URL:', apiClient.defaults.baseURL + url); // Debug log
  const res = await apiClient.get(url);
  return res.data;
};

// Get all works by a specific author via their Open Library author key
const getAuthorFromOpenLib = async (authorKey) => {
  const url = `/authors/${authorKey}/works.json`;
  console.log('Full URL:', apiClient.defaults.baseURL + url); // Debug log
  const res = await apiClient.get(url);
  return res.data;
};

// Get details of a specific book work (title, description, etc.)
const getWorkDetailsFromOpenLib = async (workID) => {
  const url = `/works/${workID}.json`;
  console.log("Full URL:", apiClient.defaults.baseURL + url); // Debug log
  const res = await apiClient.get(url);
  return res.data;
};

// Get all editions for a given workID
const getEditionsOfBookFromOpenLib = async (workID) => {
  const url = `/works/${workID}/editions.json`;
  const res = await apiClient.get(url);
  return res.data;
};

// Fetch small-sized cover image from Open Library's cover service
const getSmallCoverImgFromOpenLib = async (id) => {
  const url = `/id/${id}-S.jpg`;
  const res = await coversApiClient.get(url);
  console.log("Full URL:", coversApiClient.defaults.baseURL + url);
  return res.data;
};

// Fetch medium-sized cover image
const getMediumCoverImgFromOpenLib = async (id) => {
  const url = `/id/${id}-M.jpg`;
  const res = await coversApiClient.get(url);
  console.log("Full URL:", coversApiClient.defaults.baseURL + url);
  return res.data;
};

// Fetch large-sized cover image
const getLargeCoverImgFromOpenLib = async (id) => {
  const url = `/id/${id}-L.jpg`;
  const res = await coversApiClient.get(url);
  console.log("Full URL:", coversApiClient.defaults.baseURL + url);
  return res.data;
};

// Fetch additional book details from Google Books using query + API key
const getBookDetailsFromGoogleBooks = async (query) => {
  const url = `/volumes?q=${query}&key=${process.env.GOOGLE_API_KEY}`;
  const res = await googleBooksApiClient.get(url);
  return res.data;
};

// Export all API functions
module.exports = {
  getBookByIsbnFromOpenLib,
  searchOpenLibForBook,
  getAuthorFromOpenLib,
  getWorkDetailsFromOpenLib,
  getEditionsOfBookFromOpenLib,
  getSmallCoverImgFromOpenLib,
  getMediumCoverImgFromOpenLib,
  getLargeCoverImgFromOpenLib,
  getBookDetailsFromGoogleBooks
};
