import { useEffect, useState } from "react";
import useTodos from "../hooks/useTodo";
import "../styles/index.css";
import TodoItem from "./TodoItem";
import { Tab } from "../types/type";
import AddNewTodo from "./AddNewTodo";

function TodoList() {
    
  // Destructuring the values returned from the useTodos hook
  const { 
    todos,
    activeTodosCount, 
    getActiveTodosCount, 
    clearCompleted, 
    toggleAllCompleted, 
    activeTab, 
    setActiveTab } = useTodos();


   // Represents the state of the editable input field.
  const [editable, setEditable] = useState<string>("");

  // Call getActiveTodosCount() to get active todo count whenever the todos array changes
  useEffect(() => { getActiveTodosCount() }, [todos]);


  // Filter todos based on the active tab
  const filterTodos = todos.filter((todo) => {
    if (activeTab === Tab.Active) {
        return !todo.completed;
      } else if (activeTab === Tab.Completed) {
          return todo.completed;
      } else {
          return true;
      }
  });

  return (
    <>
      <section className="todoapp">
        {/* Header section and the add todo input field */}
        <header className="header">
          <h1>todos</h1>
          <AddNewTodo/>
        </header>
      {/* Render the main section only if there are todos */}
      {todos.length !== 0 &&
        <section className="main">
          <input className="toggle-all" type="checkbox" checked={activeTodosCount===0} onChange={toggleAllCompleted}/>
          <label onClick={toggleAllCompleted} htmlFor="toggle-all">Mark all as complete</label>
          {/* Render each todo in the TodoItem component */}
          <ul className="todo-list">
            {filterTodos.map((todo) => {
              const isEditable = todo.id === editable;
              return (
                <TodoItem isEditable={isEditable} setEditable={setEditable} todo={todo}/>
              );
            })}
          </ul>
        </section>}
        {/* Render the footer only if there are todos */}
        {todos.length !== 0 &&
        <footer className="footer">
          <span className="todo-count">
            <strong>{activeTodosCount} </strong>
            items left
          </span>
            {/* Filter buttons for each tab */}
            <ul className="filters">
              {Object.values(Tab).map((tab) => (
                <li key={tab}>
                  <a
                    href="#/"
                    className={activeTab === tab ? "selected" : ""}
                    onClick={() => {
                      setActiveTab(tab);
                    }}
                  >
                    {tab}
                  </a>
                </li>
              ))}
            </ul>
            {/* Render the clear completed button only if there are completed todos */}
          {activeTodosCount !== todos.length && <button onClick={clearCompleted} className="clear-completed">Clear completed</button>}
        </footer>}
      </section>
      {/* Footer Section for the info */}
      <footer className="info">
        <p>Click to edit a todo</p>
        <p>
          Created by <a href="https://d12n.me/">Dmitry Sharabin</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </>
  );
}

export default TodoList;
