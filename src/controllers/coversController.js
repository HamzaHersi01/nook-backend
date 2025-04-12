const { getSmallCoverImgFromOpenLib } = require('../utils/api/openLibraryService');
const { getMediumCoverImgFromOpenLib } = require('../utils/api/openLibraryService');
const { getLargeCoverImgFromOpenLib } = require('../utils/api/openLibraryService');

exports.getSmallCover = async (req, res) => {
    const { id } = req.params;
    try {
      const img = await getSmallCoverImgFromOpenLib(id);
      res.set('Content-Type', 'image/jpeg');
      res.send(img);
    } catch (error) {
      console.error(error);
      res.status(404).send('Cover not found');
    }
  };

exports.getMediumCover = async (req, res) =>{
    const { isbn } = req.params;
    try {
      const img = await getMediumCoverImgFromOpenLib(isbn);
      res.set('Content-Type', 'image/jpeg');
      res.send(img);
    } catch (error) {
      console.error(error);
      res.status(404).send('Cover not found');
    }
  };

exports.getLargeCover = async (req, res) =>{
    const { isbn } = req.params;
    try {
      const img = await getLargeCoverImgFromOpenLib(isbn);
      res.set('Content-Type', 'image/jpeg');
      res.send(img);
    } catch (error) {
      console.error(error);
      res.status(404).send('Cover not found');
    }
  };