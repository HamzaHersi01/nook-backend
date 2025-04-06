const { getBookByISBN } = require('../utils/api/openLibraryService');
const {getBookBySearch} = require('../utils/api/openLibraryService');
const {getAuthorSearch} = require('../utils/api/openLibraryService');

exports.searchBookByISBN = async (req, res) => {
  const { isbn } = req.params;
  const bookInfo = await getBookByISBN(isbn);
  res.json(bookInfo);
};

exports.searchBooksByTitle = async (req, res) => {
  const { item } = req.params; 
  const searchResponse = await getBookBySearch(item);
  res.json(searchResponse);
};

exports.searchAuthor = async (req, res) =>{
  const { author } = req.params;
  const authorSearchResponse = await getAuthorSearch(author);
  res.json(authorSearchResponse)
}