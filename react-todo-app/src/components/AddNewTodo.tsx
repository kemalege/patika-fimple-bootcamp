import React from "react";
import useTodos from "../hooks/useTodo";

const AddNewTodo = () => {
  const { handleInput, input, addTodo } = useTodos();

  const handleKeyDownAddTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (event.key === "Enter" && input.trim() !== "") {
      addTodo();
    }
  }

  return (
    <form>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={handleInput}
        value={input}
        onKeyDown={handleKeyDownAddTodo}
      />
    </form>
  );
};

export default AddNewTodo;
