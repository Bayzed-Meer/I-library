const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const staffRoutes = require('./routes/staffRoutes');
const adminRoutes = require('./routes/adminRoutes');
const bookRoutes = require('./routes/bookRoutes');

app.use('/auth', authRoutes);
// app.use('/students', studentRoutes);
// app.use('/staff', staffRoutes);
// app.use('/admin', adminRoutes);
// app.use('/books', bookRoutes);

module.exports = app;

