const connection = process.env.MONGODB_URI;
const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  name: String,
  isDone: Boolean,
  date: {
    type: Date,
    default: Date.now(),
  },
});

const connectToDB = () => {
  return mongoose
    .connect(connection)
    .then(() => console.log("Connected to the database"))
    .catch((err) =>
      console.log(`Oops !. There might be something wrong... ----> ${err}`)
    );
};

module.exports = connectToDB;
