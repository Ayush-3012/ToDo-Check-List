import mongoose from "mongoose";

const todoSchema = {
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  position: {
    type: Number,
    default: 0,
  },
};

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
