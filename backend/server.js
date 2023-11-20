import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import TodoRouter from "./routes/todoListRoute";

dotenv.config();

const app = express();
const port = process.env.PORT;
const uri = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

mongoose.connect(uri);

app.use("/TodoList", TodoRouter);

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
