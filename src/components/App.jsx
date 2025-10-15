import React, { useEffect, useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskForm from "./TaskForm";
import SearchBar from "./SearchBar";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6001/tasks")
      .then((r) => r.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <TaskContext.Provider>
      <div>
        <h1>Task Manager</h1>
        <TaskForm />
        <SearchBar />
      </div>
    </TaskContext.Provider>
  );
}

export default App;
