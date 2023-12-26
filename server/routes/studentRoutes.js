const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const multer = require('multer'); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const originalExtension = file.originalname.split('.').pop();
    const username = req.body.username.replace(/\s+/g, '_');
    cb(null, `${username}.${originalExtension}`);
  },
});

const upload = multer({ storage: storage });

router.post('/scan-card', studentController.scanCard);
router.get('/with-activities', studentController.getStudentsWithActivities);
router.get('/getStudent/:libraryId', studentController.getStudent);
router.patch('/updateStudent/:libraryId',upload.single('image'), studentController.updateStudent);

module.exports = router;
