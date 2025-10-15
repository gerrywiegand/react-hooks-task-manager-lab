import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/tasks")
      .then((r) => {
        if (!r.ok) throw new Error("Network response was not ok");
        return r.json();
      })
      .then((data) => setTasks(data))
      .catch((err) => console.error("Load tasks failed:", err));
  }, []);

  // add
  function addTask(title) {
    const temp = { id: Date.now(), title, completed: false };

    setTasks((prev) => [...prev, temp]);

    fetch("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed: false }),
    })
      .then((r) =>
        r.ok
          ? r.json()
          : Promise.reject(new Error("Network response was not ok"))
      )
      .then((saved) => {
        if (!saved) return;
        setTasks((prev) => prev.map((t) => (t.id === temp.id ? saved : t)));
      })
      .catch((err) => {
        console.error("Add task failed:", err);
      });
  }

  function toggleCompleted(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

    const task = tasks.find((t) => t.id === id);
    const nextCompleted = task ? !task.completed : true;

    fetch(`/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: nextCompleted }),
    })
      .then((r) =>
        r.ok
          ? r.json()
          : Promise.reject(new Error("Network response was not ok"))
      )
      .then((saved) => {
        if (!saved) return;
        setTasks((prev) => prev.map((t) => (t.id === id ? saved : t)));
      })
      .catch((err) => {
        console.error("Toggle task failed:", err);
      });
  }

  const value = { tasks, addTask, toggleCompleted };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
