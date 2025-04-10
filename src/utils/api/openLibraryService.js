const querystring = require('querystring');
const { coversApiClient } = require("./openLibraryClient");
const { apiClient } = require("./openLibraryClient");

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

//TODO: Returns 404, need to fix
const getSmallCoverImgFromOpenLib = async(isbn) =>{

  const url = `/${isbn}-S.jpg`
  const res = await coversApiClient.get(url)
  console.log(`returned response`)
  return res.data
}

//TODO: Returns 404, need to fix
const getMediumCoverImgFromOpenLib = async(isbn) =>{
  const url = `/${isbn}-M.jpg`
  const res = await coversApiClient.get(url)
  return res.data
}

//TODO: Returns 404, need to fix
const getLargeCoverImgFromOpenLib = async(isbn) =>{
  const url = `/${isbn}-L.jpg`
  const res = await coversApiClient.get(url)
  return res.data
}

module.exports = { getBookByIsbnFromOpenLib, searchOpenLibForBook, getAuthorFromOpenLib, getWorkDetailsFromOpenLib, getEditionsOfBookFromOpenLib, getSmallCoverImgFromOpenLib,getMediumCoverImgFromOpenLib, getLargeCoverImgFromOpenLib};