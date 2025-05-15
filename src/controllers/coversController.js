const { getSmallCoverImgFromOpenLib } = require('../utils/api/openLibraryService');
const { getMediumCoverImgFromOpenLib } = require('../utils/api/openLibraryService');
const { getLargeCoverImgFromOpenLib } = require('../utils/api/openLibraryService');

// Controller to get a small cover image
exports.getSmallCover = async (req, res) => {
  const { id } = req.params; // Extract cover ID from route parameters
  try {
    const img = await getSmallCoverImgFromOpenLib(id); // Fetch image from Open Library
    res.set('Content-Type', 'image/jpeg'); // Set response content type
    res.send(img); // Send the image buffer as response
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(404).send('Cover not found'); // Respond with 404 if failed
  }
};

// Controller to get a medium cover image
exports.getMediumCover = async (req, res) => {
  const { id } = req.params;
  try {
    const img = await getMediumCoverImgFromOpenLib(id);
    res.set('Content-Type', 'image/jpeg');
    res.send(img);
  } catch (error) {
    console.error(error);
    res.status(404).send('Cover not found');
  }
};

// Controller to get a large cover image
exports.getLargeCover = async (req, res) => {
  const { id } = req.params;
  try {
    const img = await getLargeCoverImgFromOpenLib(id);
    res.set('Content-Type', 'image/jpeg');
    res.send(img);
  } catch (error) {
    console.error(error);
    res.status(404).send('Cover not found');
  }
};
