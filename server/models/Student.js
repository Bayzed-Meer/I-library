const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const studentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  libraryId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, unique: true },
  department: { type: String },
  password: { type: String, required: true },
  image: { type: String, default: 'uploads/default-photo.png' },
  role: { type: String, default: 'student' },
  activities: [{
    entryTime: { type: Date, default: null },
    exitTime: { type: Date, default: null },
  }],
  requestedBooks: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      requestTime: { type: Date, default: Date.now },
    },
  ],

  currentlyBorrowedBooks: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      borrowTime: { type: Date, default: Date.now },
      returnTime: { type: Date, default: () => new Date(+new Date() + 120 * 1000) },
    },
  ],


  borrowedHistory: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      borrowTime: { type: Date },
      returnTime: { type: Date },
    },
  ]
});

studentSchema.pre('save', async function (next) {
  const student = this;
  if (!student.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(student.password, salt);
    student.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
