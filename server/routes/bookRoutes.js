const express = require('express');
const router = express.Router();
const multer = require('multer');
const bookController = require('../controllers/bookController');

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
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
router.get('/getAllBooks', bookController.getAllBooks);
router.get('/getAllRequestedBooks', bookController.getAllRequestedBooks);
router.get('/getAllIssuedBooks', bookController.getAllIssuedBooks);
router.get('/getAllbookHistory', bookController.getAllBookHistory);
router.get('/getBook/:bookId', bookController.getBook);
router.get('/borrowHistory/:libraryId', bookController.borrowHistory);
router.post('/create', upload.single('image'), bookController.createBook);
router.post('/requestBook', bookController.requestBook);
router.post('/returnBook', bookController.returnBook);
router.post('/acceptBookRequest', bookController.acceptBookRequest);
router.delete('/deleteRequestedBook', bookController.deleteRequestedBook);
router.delete('/declineBookRequest/:objectId/:libraryId', bookController.declineBookRequest);


module.exports = router;
