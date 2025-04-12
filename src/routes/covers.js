const express = require('express');
const {getSmallCover} = require('../controllers/coversController')
const {getMediumCover} = require('../controllers/coversController')
const {getLargeCover} = require('../controllers/coversController')

const router = express.Router();

router.get('/smallCover/:id', getSmallCover);
router.get('/mediumCover/:id', getMediumCover);
router.get('/largeCover/:id', getLargeCover);

module.exports = router;