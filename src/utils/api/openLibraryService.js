const apiClient = require("./openLibraryClient");

const getBookByISBN = async (isbn) => {
  const url = `/isbn/${isbn}.json`;
  console.log('Full URL:', apiClient.defaults.baseURL + url); // Debug log
  const res = await apiClient.get(url);
  return res.data;
};

const getBookBySearch = async (searchItem) => {
    const formattedQuery = searchItem.replace(/ /g, '+');
    const url = `/search.json?title=${formattedQuery}`;
    console.log('Full URL:', apiClient.defaults.baseURL + url); // Debug log
    const res = await apiClient.get(url);
    return res.data
}

const getAuthorSearch = async(author) =>{
  const formattedQuery = author.replace(/ /g, '+');
  const url = `/search.json?author=${formattedQuery}&sort=new`;
  console.log('Full URL:', apiClient.defaults.baseURL + url); // Debug log
  const res = await apiClient.get(url);
  return res.data
}

const getBookDetails = async(key) =>{
  const url = `/works/${key}.json`
  console.log("Full URL:", apiClient.defaults.baseURL + url) //Debug log
  const res = await apiClient.get(url)
  return res.data
}

const getAllEditions = async(key) =>{
  const url = `/works/${key}/editions.json`
  const res = await apiClient.get(url)
  return res.data
}



module.exports = { getBookByISBN,getBookBySearch,getAuthorSearch, getBookDetails, getAllEditions};