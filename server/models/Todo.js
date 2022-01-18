import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const TodoSchema = mongoose.Schema({
  title: String,
  listId: String,
  cards: [
    {
      id: String,
      title: String,
    },
  ],
  author: {
    type: ObjectId,
    ref: "User",
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
