const express = require('express');
const { getWorkDetails } = require('../controllers/worksController');
const { Query } = require('pg');

const router = express.Router();

router.get('/:key', getWorkDetails);

module.exports = router;