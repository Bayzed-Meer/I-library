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

    const token = jwt.sign({ studentId: newUser.studentId, username: newUser.username }, process.env.JWT_SECRET_KEY, { expiresIn: '10d' });

    res.status(201).json({ message: 'Signup successful', token });
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
  
      const token = jwt.sign({ studentId: user.studentId, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '10d' });
  
      res.status(200).json({ message: 'Signin successful', token });
    } catch (error) {
      console.error('Signin Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };