import TodoItem from "./TodoItem";

function TodoList({ todos, toggleTodo, deleteTodo, editTodo, toggleEdit }) {
  if (todos.length === 0) {
    return <p>No tasks available</p>;
  }

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          toggleEdit={toggleEdit}
        />
      ))}
    </div>
  );
}

export default TodoList;