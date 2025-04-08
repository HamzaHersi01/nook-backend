const express = require('express');
const { getWorkDetails } = require('../controllers/worksController');
const { getEditions } = require('../controllers/worksController')
const { Query } = require('pg');

const router = express.Router();

router.get('/:key', getWorkDetails);
router.get('/getEditions/:key',getEditions)

module.exports = router;