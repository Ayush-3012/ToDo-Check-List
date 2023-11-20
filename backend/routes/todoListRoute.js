import express from "express";
import Todo from "../models/todoListModel";

const TodoRouter = express();

TodoRouter.get("/", (req, res) => {});

TodoRouter.post("/add", (req, res) => {
  //   if (req.body["todo"] != "") {
  //     const item = new Todo({
  //       name: req.body["todo"],
  //     });
  //     item.save();
  //   }
  //   res.redirect("/");
});

TodoRouter.post("/remove", (req, res) => {});

export default TodoRouter