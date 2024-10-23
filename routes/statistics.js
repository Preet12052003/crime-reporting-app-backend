const express = require('express');
const router = express.Router();
const { getCrimeStatistics } = require('../controllers/statisticsController');

router.post('/', getCrimeStatistics);

module.exports = router;