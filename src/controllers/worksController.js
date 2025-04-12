const res = require('express/lib/response');
const { getWorkDetailsFromOpenLib } = require('../utils/api/openLibraryService');
const { getEditionsOfBookFromOpenLib } = require('../utils/api/openLibraryService')

exports.getWorkDetails = async (req, res) => {
    const { workID } = req.params;
    const data = await getWorkDetailsFromOpenLib(workID);
    //TODO: Transform data.
    bookInfo = {
      title: data.title,
      description: data.description,
      cover: `http://localhost:3001/covers/mediumCover/${data.covers}`,
      created: data.created.value,
      workID: data.key,
      authorID: data.authors[0].author.key
    };
    res.json(bookInfo);
  };

exports.getEditions = async(req, res) =>{
    const { workID } = req.params;
    const editions = await getEditionsOfBookFromOpenLib(workID);
    //TODO: Transform data.
    res.json(editions)
  }