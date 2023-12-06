import { useRef, useState } from "react";
import useTodos from "../hooks/useTodo";
import "../styles/index.css";
import { Todo } from "../types/type";

type TodoItemProps = {
    isEditable: boolean;
    setEditable: (id: string) => void;
    todo: Todo;
};

const TodoItem = ({ isEditable, setEditable, todo }: TodoItemProps) => {

  const { 
    removeTodo, 
    toggleIsCompleted, 
    editTodo } = useTodos();
  
  const [editText, setEditText] = useState<string>("")

  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDownUpdateTodo = (event: React.KeyboardEvent<HTMLInputElement>, id:string) => {
    if (event.key === "Enter" && editText.trim() !== "") {
      setEditable("")
      editTodo(id, editText);
    }
  }

  const onUpdateTodoBlur = (id:string) => {
    if (editText.trim() !== "") {
      setEditable("")
      editTodo(id, editText);
    }  
  }
  
  return (
    <li key={todo.id} className={`${todo.completed ? "completed" : ""} ${isEditable? "editing" : ""}`}>
      <div className={`view ${isEditable ? "hidden" : ""}`}>
        <input className={`${todo.text !=="" ? "toggle" : "hidden"}`} type="checkbox" checked={todo.completed} onChange={() => {toggleIsCompleted(todo.id)}}/>
        <label onClick={() => {setEditable(todo.id); setEditText(todo.text)}}>{todo.text}</label>
        <button onClick={() => {removeTodo(todo.id); setEditable("")}} className="destroy"></button>
      </div>
      <input
        ref={inputRef}
        onChange={(e)=>setEditText(e.target.value)}
        onClick={(e)=>e.currentTarget.select()}
        value={editText}
        onKeyDown={(event) => handleKeyDownUpdateTodo(event, todo.id)}
        className={`edit ${isEditable ? "" : "hidden"}`}
        placeholder="(Text)"
        onBlur={() => {onUpdateTodoBlur(todo.id)}}
      />
    </li>
  )
}

export default TodoItem