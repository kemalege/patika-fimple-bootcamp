// src/hooks/useUser.js

import { useTodoStore } from "../store/todoStore"


// Custom hook for managing todos
export default function useTodos() {
    
    const todoStore = useTodoStore(state => ({
        // Todo state and actions
        todos: state.todos,
        addTodo: state.addTodo,
        editTodo: state.editTodo,
        removeTodo: state.removeTodo,
        toggleIsCompleted: state.toggleIsCompleted,
        handleInput: state.handleInput,
        handleEditInput: state.handleEditInput,
        input: state.input,
        editInput: state.editInput,
        activeTodosCount: state.activeTodosCount,
        activeTab: state.activeTab,
        setActiveTab: state.setActiveTab,
        getActiveTodosCount: state.getActiveTodosCount,
        clearCompleted: state.clearCompleted,
        toggleAllCompleted: state.toggleAllCompleted,
    }));

    return todoStore;
}
