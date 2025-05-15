const express = require('express');

// Import controller functions that handle search logic
const { searchBookByISBN } = require('../controllers/searchController');
const { searchBooksByTitle } = require('../controllers/searchController');
const { searchAuthor } = require('../controllers/searchController');

const router = express.Router();

// Route to search a book by ISBN
router.get('/isbn/:isbn', searchBookByISBN);

// Route to search books by title (partial or full match)
router.get('/title/:item', searchBooksByTitle);

// Route to get detailed author info by Open Library author key
router.get('/author/:authorKey', searchAuthor);

module.exports = router;
