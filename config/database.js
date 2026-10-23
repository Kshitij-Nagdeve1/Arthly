const mongoose = require('mongoose');

const MONGO_URL = 'mongodb://127.0.0.1:27017/arthly'

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URL);
}

module.exports = connectDB;