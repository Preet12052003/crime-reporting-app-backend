const express = require('express');
const router = express.Router();
const { submitReport, getReports, getSingleReport } = require('../controllers/crimeReportController');


router.post('/submit' , submitReport);
router.post('/all', getReports);
router.get('/:id', getSingleReport);

module.exports = router;