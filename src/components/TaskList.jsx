import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskList({ query = "" }) {
  const { tasks, toggleCompleted } = useContext(TaskContext);

  const q = String(query).toLowerCase();

  const filteredTasks = (tasks || [])
    .filter((t) => t && typeof t.title === "string" && t.title.length > 0)
    .filter((t) => t.title.toLowerCase().includes(q));

  return (
    <ul>
      {filteredTasks.map((task, idx) => (
        <li key={task.id ?? `task-${idx}`}>
          <span
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.title}
          </span>
          <button
            data-testid={String(task.id ?? `task-${idx}`)}
            onClick={() => toggleCompleted(task.id)}
          >
            {task.completed ? "Undo" : "Complete"}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
