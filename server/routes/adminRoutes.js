const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.get('/getAllbookHistory', adminController.getAllBookHistory);
router.post('/acceptBookRequest', adminController.acceptBookRequest);
router.post('/returnBook', adminController.returnBook);
router.delete('/declineBookRequest/:objectId/:libraryId', adminController.declineBookRequest);


module.exports = router;