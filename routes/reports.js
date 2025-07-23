const express = require('express');
const router = express.Router();
const {
  createReport,
  getAllReports,
  getReportById,
  flagReport
} = require('../controllers/reportController');

// Public report submission
router.post('/', createReport);

// Admin endpoints
router.get('/', getAllReports);
router.get('/:id', getReportById);
router.patch('/:id/flag', flagReport);

module.exports = router;
