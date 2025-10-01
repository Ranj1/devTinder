const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect(
       "mongodb+srv://ranjanatiwari1996:6YabwJJCnBb1L5Ft@learn-mongodb.bqpxb8x.mongodb.net/devTinder"
    );
};

module.exports = connectDB;
