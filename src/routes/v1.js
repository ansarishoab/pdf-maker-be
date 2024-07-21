const express = require('express');
const { generatePdf } = require('../controllers/v1/pdfController');
const router = express.Router();

router.post('/pdf', generatePdf);

module.exports = router;