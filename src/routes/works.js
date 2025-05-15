const express = require('express');
const { getWorkDetails } = require('../controllers/worksController');
const { getEditions } = require('../controllers/worksController');

const router = express.Router();

// Route to get all editions of a given work from Open Library
router.get('/getEditions/:workID', getEditions);

// Route to get full details of a specific work (title, description, cover, etc.)
router.get('/getBookDetails/:workID', getWorkDetails);

module.exports = router;