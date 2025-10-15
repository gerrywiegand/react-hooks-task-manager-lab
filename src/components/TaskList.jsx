import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskList({ query = "" }) {
  const { tasks, toggleCompleted } = useContext(TaskContext);

  const q = String(query).toLowerCase();

  const filteredTasks = (tasks || []).filter((task) =>
    String(task?.title || "")
      .toLowerCase()
      .includes(q)
  );

  return (
    <ul>
      {filteredTasks.map((task) => (
        <li key={task.id}>
          <span
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.title}
          </span>
          <button
            data-testid={String(task.id)}
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
