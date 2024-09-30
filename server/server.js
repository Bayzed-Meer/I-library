const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL, {});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});