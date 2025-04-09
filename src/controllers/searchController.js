const { getBookByIsbnFromOpenLib } = require('../utils/api/openLibraryService');
const {searchOpenLibForBook} = require('../utils/api/openLibraryService');
const {getAuthorFromOpenLib} = require('../utils/api/openLibraryService');

exports.searchBookByISBN = async (req, res) => {
  const { isbn } = req.params;
  const bookInfo = await getBookByIsbnFromOpenLib(isbn);
  //TODO: Implement the API call that gets the work from this response
  res.json(bookInfo);
};

exports.searchBooksByTitle = async (req, res) => {
  const { item } = req.params; 
  const searchResponse = await searchOpenLibForBook(item);
  //TODO: create array of search entries and send that as a response
  res.json(searchResponse);
};

exports.searchAuthor = async (req, res) =>{
  const { author } = req.params;
  const authorSearchResponse = await getAuthorFromOpenLib(author);
  //TODO: transform data if need be. unsure if i need this one to be honest but will keep for time being
  res.json(authorSearchResponse)
}