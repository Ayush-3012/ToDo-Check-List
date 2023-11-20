import express from "express";
import Todo from "../models/todoListModel.js";

const TodoRouter = express();

TodoRouter.get("/", (req, res) => {
  Todo.find()
    .sort({ position: 1 })
    .then((todos) => res.send(todos))
    .catch((err) => res.status(400).json("Error" + err));
});

TodoRouter.post("/add", (req, res) => {
  const { title, completed, position } = req.body;

  const newTodoItem = {
    title,
    completed,
    position,
  };

  Todo.create(newTodoItem)
    .then(() => res.status(201).json({ message: "Todo Added Successfully" }))
    .catch((err) => res.status(500).send({ message: err.message }));
});

TodoRouter.put("/updatePositions", (req, res) => {
  const updatedPositions = req.body;

  for (const { _id, position } of updatedPositions) {
    Todo.findByIdAndUpdate(_id, { position })
      .then(() => {})
      .catch((err) => res.status(500).send({ message: err.message }));
  }
});

TodoRouter.put("/updateCompleted", (req, res) => {
  const { todoId, completed } = req.body;
  Todo.findByIdAndUpdate(todoId, { completed })
    .then(() => res.status(201).json({ message: "List Updated Successfully" }))
    .catch((err) => res.status(500).send({ message: err.message }));
});

export default TodoRouter;
