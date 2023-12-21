const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  edition: { type: String, required: true },
  description: { type: String },
  quantity: { type: Number, required: true },
  review: { type: String, required: true },
  image: { type: String },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
