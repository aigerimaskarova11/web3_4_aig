const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://aygerakan07_db_user:UFhMMZhrEX60VVyB@cluster0.itrwjth.mongodb.net/assignment3?appName=Cluster0"
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
