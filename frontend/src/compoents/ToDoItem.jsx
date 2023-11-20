/* eslint-disable react/prop-types */
import { Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { motion } from "framer-motion";

const ToDoItem = ({ todoItem, index }) => {
  const [checked, setChecked] = useState(todoItem.completed);
  const { enqueueSnackbar } = useSnackbar();

  const updateList = () => {
    const updateItem = {
      todoId: todoItem._id,
      completed: !checked,
    };
    axios
      .put("http://localhost:5000/updateCompleted", updateItem)
      .then((res) => {
        setChecked(!checked);
        const { message } = res.data;
        enqueueSnackbar(message, { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(err);
      });
  };

  return (
    <Draggable draggableId={todoItem._id} index={index}>
      {(provided) => (
        <div
          className="border bg-white my-1  px-3 py-2 rounded-md max-sm:py-1"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <motion.div
            className="flex gap-2 justify-start items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: [50, 0, -20, -10, 0] }}
            transition={{ duration: 0.4 }}
          >
            <motion.input
              type="checkbox"
              className="w-8 h-4 cursor-pointer accent-purple-400 max-sm:w-3"
              whileHover={{ scale: 1.18 }}
              checked={checked}
              onChange={updateList}
            />
            <motion.p
              className={`${
                checked ? "line-through" : ""
              } text-xl font-mono font-bold max-sm:text-lg text-slate-700`}
              whileHover={{ translateY: "-5px", color: "#f80f80" }}
            >
              {todoItem.title}
            </motion.p>
          </motion.div>
        </div>
      )}
    </Draggable>
  );
};

export default ToDoItem;
