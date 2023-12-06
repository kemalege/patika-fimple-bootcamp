import { ChangeEvent } from "react";
import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid';
import { Tab, TodoState } from "../types/type";

export const useTodoStore = create<TodoState>((set) => ({
  // Todo object array
  todos: [
    { id: uuidv4(), text: "test", completed: true },
    { id: uuidv4(), text: "test 1", completed: false },
    { id: uuidv4(), text: "test 2", completed: true },
  ],

  // Todo input
  input: "",
  // Todo edit input
  editInput: "",
  // Active todos count
  activeTodosCount: null,
  // Active tab
  activeTab: Tab.All,

  // Set active tab
  setActiveTab: (tab) => { set({ activeTab: tab }) },

  // Get active todos count
  getActiveTodosCount: () =>
    set((state) => ({
      activeTodosCount: state.todos.filter((todo) => !todo.completed).length,
    })),

  // Clear completed todos
  clearCompleted: () =>
    set((state) => ({ todos: state.todos.filter((todo) => !todo.completed) })),

  // Add todo
  addTodo: () => {
    return set((state) => ({
      todos: [...state.todos, { id: uuidv4(), text: state.input, completed: false }],
      input: "",
    }));
  },

  // Handle input
  handleInput: (e: ChangeEvent<HTMLInputElement>) => {
    set({ input: e.target.value });
  },

  // Handle edit input
  handleEditInput: (e: ChangeEvent<HTMLInputElement>) => {
    set({ editInput: e.target.value });
  },

  // Toggle is completed
  toggleIsCompleted: (todoId: string) => {
    set((state) => ({
      todos: state.todos.map((todo) => {
        if (todo.id === todoId) return { ...todo, completed: !todo.completed };
        return todo;
      }),
    }));
  },

  // Toggle all completed
  toggleAllCompleted: () => {
    set((state) => {
      const allCompleted = state.todos.every((todo) => todo.completed);
      const updatedTodos = state.todos.map((todo) => ({
        ...todo,
        completed: !allCompleted,
      }));
      return {
        todos: updatedTodos,
      };
    });
  },

  // Edit todo
  editTodo: (todoId: string, editText: string) => {
    set((state) => ({
      todos: state.todos.map((todo) => {
        if (todo.id === todoId) return { ...todo, text: editText};
        return todo;
      }),
    }));
  },

  // Remove todo
  removeTodo: (todoId: string) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== todoId),
    }));
  },
}));
