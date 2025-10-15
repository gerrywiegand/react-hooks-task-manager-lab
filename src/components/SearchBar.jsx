import React, { useRef, useState } from "react";
import TaskList from "./TaskList";

function SearchBar() {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  function handleSearch(e) {
    setQuery(inputRef.current?.value || "");
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search tasks..."
        defaultvalue={query}
        onChange={handleSearch}
      />
      <TaskList query={query} />
    </div>
  );
}

export default SearchBar;
