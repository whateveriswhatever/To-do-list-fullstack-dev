const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: [true, "User must assign the names of their tasks"],
    trim: true,
    maxlength: [69, "The name of the task can only be maximum 20 characters"],
  },
  completed: {
    type: Boolean,
    // required: [true, "User must assign the status of their tasks"],
    default: false,
    trim: true,
    maxLength: [
      3,
      "User are only allowed to assign the status of their tasks to be <true> or <false>",
    ],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = TaskModel;
// module.exports = mongoose.model("Task", TaskSchema);
