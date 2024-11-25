const express = require('express');
const jobController = require('../controllers/job_controller');

const router = express.Router();

router.get('/getJobKeywords/:jobId', jobController.getJobKeywords);

module.exports = router;
