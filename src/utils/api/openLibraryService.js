const { coversApiClient } = require("./openLibraryClient");
const { apiClient } = require("./openLibraryClient");
const {googleBooksApiClient} = require("./openLibraryClient");

const getBookByIsbnFromOpenLib = async (isbn) => {
  const url = `/isbn/${isbn}.json`;
  console.log('Full URL:', apiClient.defaults.baseURL + url); // Debug log
  const res = await apiClient.get(url);
  return res.data;
};

const searchOpenLibForBook = async (searchItem) => {
    const formattedQuery = searchItem.replace(/ /g, '+');
    const url = `/search.json?title=${formattedQuery}`;
    console.log('Full URL:', apiClient.defaults.baseURL + url); // Debug log
    const res = await apiClient.get(url);
    return res.data
}

const getAuthorFromOpenLib = async(authorKey) =>{
  const url = `/authors/${authorKey}/works.json`;
  console.log('Full URL:', apiClient.defaults.baseURL + url); // Debug log
  const res = await apiClient.get(url);
  return res.data
}

const getWorkDetailsFromOpenLib = async(workID) =>{
  const url = `/works/${workID}.json`
  console.log("Full URL:", apiClient.defaults.baseURL + url) //Debug log
  const res = await apiClient.get(url)
  return res.data
} 

const getEditionsOfBookFromOpenLib = async(workID) =>{
  const url = `/works/${workID}/editions.json`
  const res = await apiClient.get(url)
  return res.data
}


const getSmallCoverImgFromOpenLib = async(id) =>{

  const url = `/id/${id}-S.jpg`
  const res = await coversApiClient.get(url)
  console.log("Full URL:", coversApiClient.defaults.baseURL + url)
  return res.data
}


const getMediumCoverImgFromOpenLib = async(id) =>{
  const url = `/id/${id}-M.jpg`
  const res = await coversApiClient.get(url)
  console.log("Full URL:", coversApiClient.defaults.baseURL + url)
  return res.data
}


const getLargeCoverImgFromOpenLib = async(id) =>{
  const url = `/id/${id}-L.jpg`
  const res = await coversApiClient.get(url)
  console.log("Full URL:", coversApiClient.defaults.baseURL + url)
  return res.data
}

const getBookDetailsFromGoogleBooks = async (query) => {
  const url = `/volumes?q=${query}&key=${process.env.GOOGLE_API_KEY}`;
  const res = await googleBooksApiClient.get(url);
  return res.data;
};

module.exports = { getBookByIsbnFromOpenLib, searchOpenLibForBook, getAuthorFromOpenLib, getWorkDetailsFromOpenLib, getEditionsOfBookFromOpenLib, getSmallCoverImgFromOpenLib,getMediumCoverImgFromOpenLib, getLargeCoverImgFromOpenLib, getBookDetailsFromGoogleBooks};