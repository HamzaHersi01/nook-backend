const { getSmallCoverImgFromOpenLib } = require('../utils/api/openLibraryService');
const { getMediumCoverImgFromOpenLib } = require('../utils/api/openLibraryService');
const { getLargeCoverImgFromOpenLib } = require('../utils/api/openLibraryService');

exports.getSmallCover = async (req, res) =>{
    const {isbn} = req.params;
    console.log("Calling on api method")
    const smallCover = await getSmallCoverImgFromOpenLib(isbn);
    res(smallCover)
}

exports.getMediumCover = async (req, res) =>{
    const {isbn} = req.params;
    const mediumCover = await getMediumCoverImgFromOpenLib(isbn);
    res(mediumCover)
}

exports.getLargeCover = async (req, res) =>{
    const {isbn} = req.params;
    const largeCover = await getLargeCoverImgFromOpenLib(isbn);
    res(largeCover)
}