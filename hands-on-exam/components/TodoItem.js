import { useState } from 'react'

export default function TodoItem({ todo, onUpdate, onDelete, onToggleComplete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleUpdate = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText.trim())
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
        className="checkbox"
      />
      
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
            autoFocus
          />
          <button onClick={handleUpdate} className="save-button">
            Save
          </button>
          <button onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      ) : (
        <div className="todo-content">
          <span className="todo-text">{todo.text}</span>
          <div className="todo-actions">
            <button 
              onClick={() => setIsEditing(true)} 
              className="edit-button"
              disabled={todo.completed}
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(todo.id)} 
              className="delete-button"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}