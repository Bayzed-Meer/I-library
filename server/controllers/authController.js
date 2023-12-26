const Student = require('../models/Student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { studentId, libraryId, username, email, phoneNumber, department, password } = req.body;

    const existingUser = await Student.findOne({ studentId });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const newUser = new Student({ username, studentId, libraryId, email, phoneNumber, department, password });

    await newUser.save();

    const token = jwt.sign({ role: newUser.role, libraryId: newUser.libraryId, studentId: newUser.studentId }, process.env.JWT_SECRET_KEY, { expiresIn: '10d' });
  
      res.status(201).json({
        message: 'Signup successful',
        token,
      });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.signin = async (req, res) => {
    try {
      const { studentId, password } = req.body;
  
      const user = await Student.findOne({ studentId });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials user' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ role: user.role, libraryId: user.libraryId, studentId: user.studentId }, process.env.JWT_SECRET_KEY, { expiresIn: '10d' });
  
      res.status(201).json({
        message: 'Signin successful',
        token,
      });
    } catch (error) {
      console.error('Signin Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.changePassword = async (req, res) => {
    const { studentId, currentPassword, newPassword } = req.body;
  
    try {
      const student = await Student.findOne({ studentId });
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      const isPasswordMatch = await bcrypt.compare(currentPassword, student.password);
  
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Current password is incorrect' });
      }
  
      student.password = newPassword;
    await student.save();
  
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };