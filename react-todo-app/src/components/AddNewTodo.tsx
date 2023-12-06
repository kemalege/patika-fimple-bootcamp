import React from "react";
import useTodos from "../hooks/useTodo";

const AddNewTodo = () => {
  // Destructuring the values returned from the useTodos hook
  const { handleInput, input, addTodo } = useTodos();

  // Handles key down event for adding a new todo item
  const handleKeyDownAddTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (event.key === "Enter" && input.trim() !== "") {
      addTodo();
    }
  }
  // Add new todo input field
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
