import { useRef, useState } from "react";
import useTodos from "../hooks/useTodo";
import "../styles/index.css";
import { Todo } from "../types/type";

// Define the type of props passed to the TodoItem component
type TodoItemProps = {
    isEditable: boolean;
    setEditable: (id: string) => void;
    todo: Todo;
};

const TodoItem = ({ isEditable, setEditable, todo }: TodoItemProps) => {

  // Destructuring the values returned from the useTodos hook
  const { 
    removeTodo, 
    toggleIsCompleted, 
    editTodo } = useTodos();
  
  // State of the editable input field.  
  const [editText, setEditText] = useState<string>("")

  // Ref to the editable input field
  const inputRef = useRef<HTMLInputElement>(null);

  // Handles key down event for updating a todo item
  const handleKeyDownUpdateTodo = (event: React.KeyboardEvent<HTMLInputElement>, id:string) => {
    if (event.key === "Enter" && editText.trim() !== "") {
      setEditable("")
      editTodo(id, editText);
    }
  }
  
  // Handles the blur event when updating a todo item.
  const onUpdateTodoBlur = (id: string) => {
    if (editText.trim() !== "") {
      setEditable("");
      editTodo(id, editText);
    }
  }
  {/* Render each todo in the TodoItem component */}
  return (
    <li key={todo.id} className={`${todo.completed ? "completed" : ""} ${isEditable? "editing" : ""}`}>
      <div className={`view ${isEditable ? "hidden" : ""}`}>
        {/* Render the checkbox only if the todo is not editable */}
        <input className={`${todo.text !=="" ? "toggle" : "hidden"}`} type="checkbox" checked={todo.completed} onChange={() => {toggleIsCompleted(todo.id)}}/>
        <label onClick={() => {setEditable(todo.id); setEditText(todo.text)}}>{todo.text}</label>
        {/* Delete todo button */}
        <button onClick={() => {removeTodo(todo.id); setEditable("")}} className="destroy"></button>
      </div>
      {/* Render the editable input field only if isEditable is true */}
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