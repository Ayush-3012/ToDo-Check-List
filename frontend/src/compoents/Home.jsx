import { useEffect, useState } from "react";
import axios from "axios";
import ToDoItem from "./ToDoItem";
import { IoIosAddCircleOutline } from "react-icons/io";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSnackbar } from "notistack";
import { motion } from "framer-motion";

const Home = () => {
  const [myTodos, setMyTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    axios
      .get("http://localhost:5000/")
      .then((res) => setMyTodos(res.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodoItem = {
      title: todo,
      completed: false,
      position: myTodos.length,
    };

    axios
      .post("http://localhost:5000/add", newTodoItem)
      .then((res) => {
        fetchTodos();
        const { message } = res.data;
        enqueueSnackbar(message, { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(err);
      });

    setTodo("");
  };

  const updatePositions = (updatedItems) => {
    const updatedPositions = updatedItems.map((item, index) => ({
      _id: item._id,
      position: index,
    }));

    axios
      .put("http://localhost:5000/updatePositions", updatedPositions)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(myTodos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setMyTodos(items);
    updatePositions(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <motion.div
        className="bg-slate-300 p-2 flex gap-2 flex-col items-center rounded-xl"
        animate={{ x: [-100, -50, 0, 10, 0] }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <form
            action="/add"
            method="post"
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-wrap justify-center items-center px-2 py-2 gap-4 max-sm:gap-2"
          >
            <input
              type="text"
              value={todo}
              required
              className="text-center w-96  border-2 rounded-md py-2 font-mono text-lg focus:outline-none focus:border-2 focus:border-slate-700 max-md:w-80 max-sm:w-60 max-sm:text-md"
              onChange={(e) => setTodo(e.target.value)}
              placeholder="Enter Your Todo..."
            />
            <motion.button
              type="submit"
              className="bg-slate-600 p-1 text-white hover:bg-purple-700 font-bold font-mono rounded-md"
              whileHover={{ translateY: "-3px" }}
            >
              <IoIosAddCircleOutline className="text-4xl text-emerald-400 max-md:text-3xl max-sm:text-2xl" />
            </motion.button>
          </form>
        </div>
        <div className="px-8 w-full overflow-y-scroll h-96">
          <Droppable droppableId="todoList">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {myTodos.map((todoItem, index) => (
                  <ToDoItem
                    key={todoItem._id}
                    todoItem={todoItem}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </motion.div>
    </DragDropContext>
  );
};

export default Home;
