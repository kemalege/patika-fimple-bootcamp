import { ChangeEvent } from "react";

// Type definition for Todo Item
export type Todo = { id: string, text: string; completed: boolean };

// Type definition for Todo State and actions
export type TodoState = {
    todos: Todo[];
    input: string;
    editInput: string;
    activeTodosCount: number | null;
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
    getActiveTodosCount: () => void;
    clearCompleted: () => void;
    handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
    handleEditInput: (e: ChangeEvent<HTMLInputElement>) => void;
    addTodo: () => void;
    toggleIsCompleted: (index: string) => void;
    toggleAllCompleted: () => void;
    editTodo: (todoId: string, editText: string) => void;
    removeTodo: (index: string) => void;
  };

  // Enum for Todo Tabs
  export enum Tab {
    All = "All",
    Active = "Active",
    Completed = "Completed",
  }