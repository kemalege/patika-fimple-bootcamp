import { ChangeEvent } from "react";
import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid';
import { Tab, TodoState } from "../types/type";

export const useTodoStore = create<TodoState>((set) => ({
  todos: [
    { id: uuidv4(), text: "test", completed: true },
    { id: uuidv4(), text: "test 1", completed: false },
    { id: uuidv4(), text: "test 2", completed: true },
  ],

  input: "",
  editInput: "",
  activeTodosCount: null,
  activeTab: Tab.All,

  setActiveTab: (tab) => { set({ activeTab: tab }) },

  getActiveTodosCount: () =>
    set((state) => ({
      activeTodosCount: state.todos.filter((todo) => !todo.completed).length,
    })),

  clearCompleted: () =>
    set((state) => ({ todos: state.todos.filter((todo) => !todo.completed) })),

  addTodo: () => {
    return set((state) => ({
      todos: [...state.todos, { id: uuidv4(), text: state.input, completed: false }],
      input: "",
    }));
  },

  handleInput: (e: ChangeEvent<HTMLInputElement>) => {
    set({ input: e.target.value });
  },

  handleEditInput: (e: ChangeEvent<HTMLInputElement>) => {
    set({ editInput: e.target.value });
  },

  toggleIsCompleted: (todoId: string) => {
    set((state) => ({
      todos: state.todos.map((todo) => {
        if (todo.id === todoId) return { ...todo, completed: !todo.completed };
        return todo;
      }),
    }));
  },

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

  editTodo: (todoId: string, editText: string) => {
    set((state) => ({
      todos: state.todos.map((todo) => {
        if (todo.id === todoId) return { ...todo, text: editText};
        return todo;
      }),
    }));
  },

  removeTodo: (todoId: string) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== todoId),
    }));
  },
}));
