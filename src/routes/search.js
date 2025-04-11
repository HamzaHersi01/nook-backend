const express = require('express');
const { searchBookByISBN } = require('../controllers/searchController');
const { searchBooksByTitle } = require('../controllers/searchController');
const { searchAuthor } = require('../controllers/searchController')
const { Query } = require('pg');

const router = express.Router();

router.get('/isbn/:isbn', searchBookByISBN);
router.get('/title/:item', searchBooksByTitle);
router.get('/author/:authorKey',searchAuthor)

module.exports = router;