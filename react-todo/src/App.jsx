import { useEffect, useReducer, useState } from "react";
import "./App.css";
import tasksReducer from "./reducers/tasksReducer";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import TaskStats from "./components/TaskStats";
import SearchFilter from "./components/SearchFilter";

const STORAGE_KEY = "reactTodoTasks";
const initialTasks = [
  {
    id: 1,
    text: "Learn React",
    completed: false
  },
  {
    id: 2,
    text: "Learn useReducer",
    completed: false
  },
  {
    id: 3,
    text: "Learn Node",
    completed: false
  },
  {
    id: 4,
    text: "Learn Redux",
    completed: false
  }
];



function App() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks,
    getInitialTasks
  );
  
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const remaining = total - completed;

  const visibleTasks = tasks.filter((task) => {
    const matchesSearch = task.text.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) { return }
    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  useEffect(() => { 
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks])
  
  function getInitialTasks() { 
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) { 
      return JSON.parse(savedTasks);
    } else {
      return initialTasks;
    }
  }

  return (
    <div>
      <h1>React Todo</h1>
      <AddTask dispatch={dispatch} />
      <SearchFilter
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
      />
      <TaskList
        tasks={visibleTasks}
        dispatch={dispatch}
      />
      <TaskStats
        dispatch={dispatch}
        total={total}
        completed={completed}
        remaining={remaining}
      />
    </div>
  );
}

export default App;