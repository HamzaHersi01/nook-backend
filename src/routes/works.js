const express = require('express');
const { getWorkDetails } = require('../controllers/worksController');
const { getEditions } = require('../controllers/worksController')

const router = express.Router();


router.get('/getEditions/:workID',getEditions)
router.get('/getBookDetails/:workID', getWorkDetails)

module.exports = router;