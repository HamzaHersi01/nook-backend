const res = require('express/lib/response');
const { getWorkDetailsFromOpenLib } = require('../utils/api/openLibraryService');
const { getEditionsOfBookFromOpenLib } = require('../utils/api/openLibraryService')

exports.getWorkDetails = async (req, res) => {
    const { key } = req.params;
    const bookInfo = await getWorkDetailsFromOpenLib(key);
    //TODO: Transform data.
    res.json(bookInfo);
  };

exports.getEditions = async(req, res) =>{
    const { key } = req.params;
    const editions = await getEditionsOfBookFromOpenLib(key);
    //TODO: Transform data.
    res.json(editions)
  }