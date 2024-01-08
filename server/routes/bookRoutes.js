const express = require('express');
const router = express.Router();
const multer = require('multer');
const bookController = require('../controllers/bookController');


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

router.get('/getAllBooks', bookController.getAllBooks);
router.get('/getAllRequestedBooks', bookController.getAllRequestedBooks);
router.get('/getAllIssuedBooks', bookController.getAllIssuedBooks);
router.get('/getBook/:bookId', bookController.getBook);
router.get('/borrowHistory/:libraryId', bookController.borrowHistory);
router.post('/create', upload.single('image'), bookController.createBook);
router.post('/requestBook', bookController.requestBook);
router.put('/updateBook/:bookId', multer({ storage: storage }).single('image'), bookController.updateBook);
router.delete('/deleteRequestedBook', bookController.deleteRequestedBook);
router.delete('/deleteBook/:bookId', bookController.deleteBook);


module.exports = router;
