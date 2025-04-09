const express = require('express');
const {getSmallCover} = require('../controllers/coversController')
const {getMediumCover} = require('../controllers/coversController')
const {getLargeCover} = require('../controllers/coversController')

const router = express.Router();

router.get('/smallCover/:isbn', getSmallCover);
router.get('/mediumCover/:isbn', getMediumCover);
router.get('/largeCover/:isbn', getLargeCover);

module.exports = router;