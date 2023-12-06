import { useEffect, useState } from "react";
import useTodos from "../hooks/useTodo";
import "../styles/index.css";
import TodoItem from "./TodoItem";
import { Tab } from "../types/type";
import AddNewTodo from "./AddNewTodo";

function TodoList() {
    
  const { 
    todos,
    activeTodosCount, 
    getActiveTodosCount, 
    clearCompleted, 
    toggleAllCompleted, 
    activeTab, 
    setActiveTab } = useTodos();

  const [editable, setEditable] = useState<string>("");

  useEffect(() => { getActiveTodosCount() }, [todos]);


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
        <header className="header">
          <h1>todos</h1>
          <AddNewTodo/>
        </header>
      {todos.length !== 0 &&
        <section className="main">
          <input className="toggle-all" type="checkbox" checked={activeTodosCount===0} onChange={toggleAllCompleted}/>
          <label onClick={toggleAllCompleted} htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {filterTodos.map((todo) => {
              const isEditable = todo.id === editable;
              return (
                <TodoItem isEditable={isEditable} setEditable={setEditable} todo={todo}/>
              );
            })}
          </ul>
        </section>}
        {todos.length !== 0 &&
        <footer className="footer">
          <span className="todo-count">
            <strong>{activeTodosCount} </strong>
            items left
          </span>
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
          {activeTodosCount !== todos.length && <button onClick={clearCompleted} className="clear-completed">Clear completed</button>}
        </footer>}
      </section>

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
