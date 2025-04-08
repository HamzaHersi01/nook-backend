const res = require('express/lib/response');
const { getBookDetails } = require('../utils/api/openLibraryService');
const { getAllEditions } = require('../utils/api/openLibraryService')

exports.getWorkDetails = async (req, res) => {
    const { key } = req.params;
    const bookInfo = await getBookDetails(key);
    //TODO: Transform data if need be.
    res.json(bookInfo);
  };

exports.getEditions = async(req, res) =>{
    const { key } = req.params;
    const editions = await getAllEditions(key);
    //TODO: Transform data.
    res.json(editions)
  }