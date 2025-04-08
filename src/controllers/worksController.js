const res = require('express/lib/response');
const { getBookDetails } = require('../utils/api/openLibraryService');

exports.getWorkDetails = async (req, res) => {
    const { key } = req.params;
    const bookInfo = await getBookDetails(key);
    //TODO: Transform data if need be.
    res.json(bookInfo);
  };