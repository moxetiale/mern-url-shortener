/* ------------------------------------------------------------------ */
// db.js

const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://user:password2@cluster0.7akha.mongodb.net/Cluster0?retryWrites=true&w=majority",
      {
        useNewUrlParser: true, useUnifiedTopology: true
      }
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
