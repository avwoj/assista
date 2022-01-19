import mongoose from "mongoose";
import Todo from "../models/Todo.js";
import User from "../models/User.js";

export const getTodo = async (req, res) => {
  const { userId } = req.params;

  //   if (!req.userId) return res.json({ message: "Unauthenticated" });
  try {
    const todoItems = await Todo.find();

    const filteredTodoItems = todoItems.filter(
      (todo) => String(todo.author) === String(userId)
    );
    res.status(200).json(filteredTodoItems);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const makeTodo = async (req, res) => {
  const todo = req.body;
  if (!req.userId) return res.json({ message: "Unauthenticated" });

  const newTodo = new Todo(todo);
  try {
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  const { id: _id } = req.params;
  const todo = req.body;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No task with that id");
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    _id,
    { ...todo, _id },
    { new: true }
  );
  res.json(updatedTodo);
};
