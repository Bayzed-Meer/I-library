const Book = require('../models/Book');
const Student = require('../models/Student');

exports.createBook = async (req, res) => {
  try {
    const { title, author, category, edition, description, quantity, rating } = req.body;

    const image = req.file ? req.file.path : null;

    const newBook = new Book({
      title,
      author,
      category,
      edition,
      description,
      quantity,
      rating,
      image,
    });

    await newBook.save();

    res.status(201).json({ message: 'Book created successfully' });
  } catch (error) {
    console.error('Create Book Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllBooks = async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.requestBook = async (req, res) => {
    try {
      const { bookId, libraryId } = req.body;
      const student = await Student.findOne({ libraryId });
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      const book = await Book.findById(bookId);
  
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      const isBookRequested = student.requestedBooks.some((requestedBook) =>
        requestedBook.bookId.equals(bookId)
      );
  
      const isBookBorrowed = student.currentlyBorrowedBooks.some((borrowedBook) =>
        borrowedBook.bookId.equals(bookId)
      );
  
      if (isBookRequested || isBookBorrowed) {
        return res.status(400).json({ message: 'Book is already requested or borrowed' });
      }
  
      student.requestedBooks.push({ bookId });
  
      await student.save();
  
      res.status(200).json({ message: 'Book requested successfully' });
    } catch (error) {
      console.error('Request Book Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.getBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error('Get Book Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteRequestedBook = async (req, res) => {
  const { bookId, libraryId } = req.body;

  try {
    const student = await Student.findOne({ libraryId });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const bookIndex = student.requestedBooks.findIndex((book) => book._id.toString() === bookId);
    
    if (bookIndex === -1) {
      return res.status(404).json({ message: 'Requested book not found' });
    }

    const deletedBook = student.requestedBooks.splice(bookIndex, 1)[0];

    await student.save({ validateBeforeSave: false });

    res.status(200).json({ message: 'Requested book deleted successfully' });
  } catch (error) {
    console.error('Error deleting requested book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};