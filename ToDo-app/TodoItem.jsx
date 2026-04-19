import { useState } from "react";

function TodoItem({
  todo,
  toggleTodo,
  deleteTodo,
  editTodo,
  toggleEdit,
}) {
  const [newText, setNewText] = useState(todo.text);

  return (
    <div className="todo-item">
      <div className="left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />

        {!todo.isEditing ? (
          <span
            className={todo.completed ? "done" : ""}
            onDoubleClick={() => toggleEdit(todo.id)}
          >
            {todo.text}
          </span>
        ) : (
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
        )}
      </div>

      <div className="actions">
        {!todo.isEditing ? (
          <button onClick={() => toggleEdit(todo.id)}>Edit</button>
        ) : (
          <button onClick={() => editTodo(todo.id, newText)}>
            Save
          </button>
        )}

        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TodoItem;