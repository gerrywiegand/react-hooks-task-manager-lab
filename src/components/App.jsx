import React from "react";
import { TaskProvider } from "../context/TaskContext";
import TaskForm from "./TaskForm";
import SearchBar from "./SearchBar";

function App() {
  return (
    <TaskProvider>
      <div>
        <h1>Task Manager</h1>
        <TaskForm />
        <SearchBar />
      </div>
    </TaskProvider>
  );
}

export default App;
