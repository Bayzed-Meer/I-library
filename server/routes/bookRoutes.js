const express = require('express');
const router = express.Router();
const multer = require('multer');
const bookController = require('../controllers/bookController');

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Define the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const title = req.body.title.replace(/\s+/g, '_');
    const author = req.body.author.replace(/\s+/g, '_');
    
    const originalExtension = file.originalname.split('.').pop();
    cb(null, title + '_' + author + '.' + originalExtension);
  },
});

const upload = multer({ storage: storage });

// Routes
router.post('/create', upload.single('image'), bookController.createBook);
router.get('/getAllBooks', bookController.getAllBooks);

module.exports = router;
