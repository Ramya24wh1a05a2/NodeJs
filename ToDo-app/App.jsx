import { useState } from "react";
import TodoList from "./todolist";
import TodoForm from "./todoform";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
      isEditing: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleEdit = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, isEditing: !t.isEditing } : t
      )
    );
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map((t) =>
        t.id === id
          ? { ...t, text: newText, isEditing: false }
          : t
      )
    );
  };

  return (
    <div>
      {/* 👇 ADDED HERE */}
      <h3>Name: MADHUMITHA VARDELLI</h3>
      <h3>Roll No: 24WH1A05B4</h3>

      <h1>Todo App ✅</h1>

      <TodoForm addTodo={addTodo} />

      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        toggleEdit={toggleEdit}
      />
    </div>
  );
}

export default App;