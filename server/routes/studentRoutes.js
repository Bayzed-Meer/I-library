const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/scan-card', studentController.scanCard);
router.get('/with-activities', studentController.getStudentsWithActivities);

module.exports = router;
