const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true});
        console.log(`MongoDB connected ${mongoose.connection.host}`.bgYellow.white);
    } catch (error) {
        console.log(`mongodb server issue ${error}`.bgRed.white);
    }
};

module.exports = connectDB;