const Book = require('../models/Book');
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
