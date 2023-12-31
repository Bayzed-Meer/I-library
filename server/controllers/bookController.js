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
    const book = await Book.findById(bookId).select('-image');

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

exports.getAllRequestedBooks = async (req, res) => {
  try {
    const books = await Book.find();
    const requestedBooks = [];

    for (const book of books) {
      const students = await Student.find({ 'requestedBooks.bookId': book._id });

      for (const student of students) {
        const requestDetails = student.requestedBooks.find((reqBook) =>
          reqBook.bookId.equals(book._id)
        );

        requestedBooks.push({
          bookTitle: book.title,
          studentName: student.username,
          libraryId: student.libraryId,
          requestedTime: requestDetails.requestTime,
          objectId: requestDetails._id
        });
      }
    }
    res.status(200).json(requestedBooks);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.declineBookRequest = async (req, res) => {
  try {
    const { objectId, libraryId } = req.params;

    const student = await Student.findOne({ libraryId });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const bookIndex = student.requestedBooks.findIndex(
      (book) => book._id.toString() === objectId
    );

    if (bookIndex === -1) {
      return res.status(404).json({ message: 'Requested book not found' });
    }

    student.requestedBooks.splice(bookIndex, 1);
    await student.save({ validateBeforeSave: false });

    res.status(200).json({ message: 'Book request declined successfully' });
  } catch (error) {
    console.error('Error declining book request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.acceptBookRequest = async (req, res) => {
  try {
    const { objectId, libraryId } = req.body;

    const student = await Student.findOne({ libraryId });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const requestedBookIndex = student.requestedBooks.findIndex(
      (reqBook) => reqBook._id.toString() === objectId
    );

    if (requestedBookIndex === -1) {
      return res.status(404).json({ message: 'Requested book not found' });
    }

    const requestedBook = student.requestedBooks[requestedBookIndex];

    student.requestedBooks.splice(requestedBookIndex, 1);

    student.currentlyBorrowedBooks.push({
      bookId: requestedBook.bookId,
      borrowTime: new Date(),
    });

    await student.save();

    res.status(200).json({ message: 'Book request accepted successfully' });
  } catch (error) {
    console.error('Error accepting book request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getAllIssuedBooks = async (req, res) => {
  try {
    const students = await Student.find();
    const issuedBooks = [];

    for (const student of students) {
      for (const borrowedBook of student.currentlyBorrowedBooks) {
        const book = await Book.findById(borrowedBook.bookId);

        if (!book) {
          console.warn(`Book with ID ${borrowedBook.bookId} not found for student ${student.libraryId}`);
          continue;
        }

        issuedBooks.push({
          studentName: student.username,
          libraryId: student.libraryId,
          bookName: book.title,
          borrowDate: borrowedBook.borrowTime,
          returnDate: borrowedBook.returnTime,
          objectId: borrowedBook._id,
        });
      }
    }

    res.status(200).json(issuedBooks);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { objectId, libraryId } = req.body;

    const student = await Student.findOne({ libraryId });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const borrowedBookIndex = student.currentlyBorrowedBooks.findIndex(
      (borrowedBook) => borrowedBook._id.toString() === objectId
    );

    if (borrowedBookIndex === -1) {
      return res.status(404).json({ message: 'Borrowed book not found' });
    }

    const borrowedBook = student.currentlyBorrowedBooks[borrowedBookIndex];

    student.currentlyBorrowedBooks.splice(borrowedBookIndex, 1);

    student.borrowedHistory.push({
      bookId: borrowedBook.bookId,
      borrowTime: borrowedBook.borrowTime,
      returnTime: new Date(),
    });

    await student.save({ validateBeforeSave: false });

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (error) {
    console.error('Error returning book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.borrowHistory = async (req, res) => {
  try {
    const { libraryId } = req.params;

    // Find the student with the given libraryId
    const student = await Student.findOne({ libraryId });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Retrieve the borrow history details
    const borrowHistory = [];

    for (const historyEntry of student.borrowedHistory) {
      const book = await Book.findById(historyEntry.bookId);

      if (!book) {
        console.warn(`Book with ID ${historyEntry.bookId} not found for student ${student.libraryId}`);
        continue;
      }

      borrowHistory.push({
        bookName: book.title,
        borrowTime: historyEntry.borrowTime,
        returnTime: historyEntry.returnTime,
      });
    }

    res.status(200).json(borrowHistory);
  } catch (error) {
    console.error('Error fetching borrow history:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const result = await Book.deleteOne({ _id: bookId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { title, author, category, edition, description, quantity, rating } = req.body;

    const image = req.file ? req.file.path : null;

    await Book.findByIdAndUpdate(bookId, {
      title,
      author,
      category,
      edition,
      description,
      quantity,
      rating,
      ...(image && { image }),
    });

    res.status(200).json({ message: 'Book updated successfully' });
  } catch (error) {
    console.error('Update Book Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getAllBookHistory = async (req, res) => {
  try {
    const students = await Student.find();
    const allBookHistory = [];

    for (const student of students) {
      for (const historyEntry of student.borrowedHistory) {
        const book = await Book.findById(historyEntry.bookId);

        if (!book) {
          console.warn(`Book with ID ${historyEntry.bookId} not found for student ${student.libraryId}`);
          continue;
        }

        allBookHistory.push({
          studentName: student.username,
          libraryId: student.libraryId,
          bookName: book.title,
          borrowDate: historyEntry.borrowTime,
          returnDate: historyEntry.returnTime,
          objectId: historyEntry._id,
        });
      }
    }

    res.status(200).json(allBookHistory);
  } catch (error) {
    console.error('Error fetching all book history:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

