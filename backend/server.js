import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import TodoRouter from "./routes/ToDoListRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const uri = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

mongoose
  .connect(uri)
  .then((res) =>
    console.log(
      "MongoDB Connected : ",
      res.connection.name,
      " HOST!!! ",
      res.connection.host
    )
  )
  .catch((err) => console.log(err));

app.use("/", TodoRouter);

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
