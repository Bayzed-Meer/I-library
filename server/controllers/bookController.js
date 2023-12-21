const Book = require('../models/Book');

exports.createBook = async (req, res) => {
  try {
    const { title, author, category, edition, description, quantity, rating } = req.body;

    // Get the image file from the request
    const image = req.file ? req.file.path : null;

    // Create a new book instance
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

    // Save the book to the database
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