const express = require('express');

// Import controller functions for each cover size
const { getSmallCover } = require('../controllers/coversController');
const { getMediumCover } = require('../controllers/coversController');
const { getLargeCover } = require('../controllers/coversController');

const router = express.Router();

// Route to fetch small-sized book cover
router.get('/smallCover/:id', getSmallCover);

// Route to fetch medium-sized book cover
router.get('/mediumCover/:id', getMediumCover);

// Route to fetch large-sized book cover
router.get('/largeCover/:id', getLargeCover);

module.exports = router;
