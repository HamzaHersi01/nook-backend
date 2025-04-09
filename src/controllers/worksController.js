const res = require('express/lib/response');
const { getWorkDetailsFromOpenLib } = require('../utils/api/openLibraryService');
const { getEditionsOfBookFromOpenLib } = require('../utils/api/openLibraryService')

exports.getWorkDetails = async (req, res) => {
    const { workID } = req.params;
    const bookInfo = await getWorkDetailsFromOpenLib(workID);
    //TODO: Transform data.
    res.json(bookInfo);
  };

exports.getEditions = async(req, res) =>{
    const { workID } = req.params;
    const editions = await getEditionsOfBookFromOpenLib(workID);
    //TODO: Transform data.
    res.json(editions)
  }