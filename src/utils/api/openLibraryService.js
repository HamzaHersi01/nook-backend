const apiClient = require("./openLibraryClient");

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

const getAuthorFromOpenLib = async(author) =>{
  const formattedQuery = author.replace(/ /g, '+');
  const url = `/search.json?author=${formattedQuery}&sort=new`;
  console.log('Full URL:', apiClient.defaults.baseURL + url); // Debug log
  const res = await apiClient.get(url);
  return res.data
}

const getWorkDetailsFromOpenLib = async(key) =>{
  const url = `/works/${key}.json`
  console.log("Full URL:", apiClient.defaults.baseURL + url) //Debug log
  const res = await apiClient.get(url)
  return res.data
}

const getEditionsOfBookFromOpenLib = async(key) =>{
  const url = `/works/${key}/editions.json`
  const res = await apiClient.get(url)
  return res.data
}

const getSmallCoverImgFromOpenLib = async(isbn) =>{
  const url = `/`
}





module.exports = { getBookByIsbnFromOpenLib, searchOpenLibForBook, getAuthorFromOpenLib, getWorkDetailsFromOpenLib, getEditionsOfBookFromOpenLib};