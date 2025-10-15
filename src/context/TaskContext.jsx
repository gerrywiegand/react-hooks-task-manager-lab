import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6001/tasks")
      .then((r) => {
        if (!r.ok) throw new Error("Network response was not ok");
        return r.json();
      })
      .then((data) => setTasks(data))
      .catch((err) => console.error("Load tasks failed:", err));
  }, []);

  function addTask(title) {
    const newTask = { title, completed: false };

    fetch("http://localhost:6001/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Network response was not ok");
        return r.json();
      })
      .then((data) => setTasks((prev) => [...prev, data]))
      .catch((err) => console.error("Add task failed:", err));
  }

  function toggleCompleted(id) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    fetch(`http://localhost:6001/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Network response was not ok");
        return r.json();
      })
      .then((data) =>
        setTasks((prev) => prev.map((t) => (t.id === id ? data : t)))
      )
      .catch((err) => console.error("Toggle task failed:", err));
  }

  const value = { tasks, addTask, toggleCompleted };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
